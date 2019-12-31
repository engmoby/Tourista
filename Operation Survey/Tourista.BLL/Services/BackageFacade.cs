using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.BLL.Services.ManageStorage;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class BackageFacade : BaseFacade, IBackageFacade
    {
        private readonly IBackageService _BackageService;
        private readonly IBackageTranslationService _BackageTranslationService;
        private readonly IManageStorage _manageStorage; 


        public BackageFacade(IBackageService BackageService, IUnitOfWorkAsync unitOfWork, IBackageTranslationService typeTranslationService, IManageStorage manageStorage) : base(unitOfWork)
        {
            _BackageService = BackageService;
            _BackageTranslationService = typeTranslationService;
            _manageStorage = manageStorage; 
        }

        public BackageFacade(IBackageService BackageService, IBackageTranslationService typeTranslationService, IManageStorage manageStorage )
        {
            _BackageService = BackageService;
            _BackageTranslationService = typeTranslationService;
            _manageStorage = manageStorage; 
        }

        public BackageDto GetBackage(long BackageId, int tenantId)
        {
            return Mapper.Map<BackageDto>(_BackageService.Query(x => x.BackageId == BackageId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public BackageDto CreateBackage(BackageDto BackageDto, int userId, int tenantId, List<MemoryStream> files, string path)
        {
            if (GetBackage(BackageDto.BackageId, tenantId) != null)
            {
                return EditBackage(BackageDto, userId, tenantId, files, path, 1);
            }
            ValidateBackage(BackageDto, tenantId);
            var BackageObj = Mapper.Map<Backage>(BackageDto);
            foreach (var BackageName in BackageDto.TitleDictionary)
            {
                BackageObj.BackageTranslations.Add(new BackageTranslation
                {
                    Title = BackageName.Value,
                    Description = BackageDto.DescriptionDictionary[BackageName.Key],
                    Language = BackageName.Key,
                });
            }

            BackageObj.TenantId = tenantId;
            BackageObj.CityId = BackageDto.CityId;
            BackageObj.TypeId = BackageDto.TypeId;
            BackageObj.HotelId = BackageDto.HotelId;
            BackageObj.HotelTitle= BackageDto.HotelTitle;
            BackageObj.DaysCount = BackageDto.DaysCount;
            BackageObj.NigthsCount = BackageDto.NigthsCount;
            BackageObj.Star = BackageDto.Star;
            BackageObj.Price = BackageDto.Price;
            BackageObj.CreationTime = Strings.CurrentDateTime;
            BackageObj.CreatorUserId = userId;
            BackageObj.CurrencyId = BackageDto.CurrencyId;



            _BackageTranslationService.InsertRange(BackageObj.BackageTranslations);
            _BackageService.Insert(BackageObj);

            SaveChanges();
            var imageId = 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Backage-" + BackageObj.BackageId, memoryStream, imageId.ToString());
                imageId++;
            }
            return BackageDto;
        }

        public BackageDto EditBackage(BackageDto BackageDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter)
        {
            var BackageObj = _BackageService.Query(x => x.BackageId == BackageDto.BackageId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (BackageObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            //  ValidateBackage(BackageDto, tenantId);
            foreach (var BackageName in BackageDto.TitleDictionary)
            {
                var BackageTranslation = BackageObj.BackageTranslations.FirstOrDefault(x => x.Language.ToLower() == BackageName.Key.ToLower()
                && x.BackageId == BackageDto.BackageId);
                if (BackageTranslation == null)
                {
                    BackageObj.BackageTranslations.Add(new BackageTranslation
                    {
                        Title = BackageName.Value,
                        Description = BackageDto.DescriptionDictionary[BackageName.Key],
                        Language = BackageName.Key
                    });
                }
                else
                {
                    BackageTranslation.Title = BackageName.Value;
                    BackageTranslation.Description = BackageDto.DescriptionDictionary[BackageName.Key];

                }
            }

            BackageObj.CityId = BackageDto.CityId; 
            BackageObj.TypeId = BackageDto.TypeId;
            BackageObj.HotelId = BackageDto.HotelId;
            BackageObj.HotelTitle = BackageDto.HotelTitle;
            BackageObj.DaysCount = BackageDto.DaysCount;
            BackageObj.NigthsCount = BackageDto.NigthsCount;
            BackageObj.Star = BackageDto.Star;
            BackageObj.Price = BackageDto.Price;
            BackageObj.LastModificationTime = Strings.CurrentDateTime;
            BackageObj.LastModifierUserId = userId;
            BackageObj.IsDeleted = BackageDto.IsDeleted;
            BackageObj.CurrencyId = BackageDto.CurrencyId;


            _BackageService.Update(BackageObj);
            SaveChanges();
            var imageId = 1;// imageCounter + 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Backage-" + BackageObj.BackageId, memoryStream, imageId.ToString());
                imageId++;
            }
            return BackageDto;

        }

        public PagedResultsDto GetAllBackages(int page, int pageSize, int tenantId)
        {
            return _BackageService.GetAllBackages(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineBackages(int page, int pageSize, int tenantId)
        {
            return _BackageService.GetAllOnlineBackages(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineRelatedBackagesById(long BackageId, int page, int pageSize, int tenantId)
        {
            return _BackageService.GetAllOnlineRelatedBackagesById(BackageId, page, pageSize, tenantId);
        }
        private void ValidateBackage(BackageDto BackageDto, long tenantId)
        {
            foreach (var name in BackageDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_BackageTranslationService.CheckNameExist(name.Value, name.Key, BackageDto.BackageId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
