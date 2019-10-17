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
    public class TourFacade : BaseFacade, ITourFacade
    {
        private readonly ITourService _TourService;
        private readonly ITourTranslationService _TourTranslationService;
        private readonly IManageStorage _manageStorage; 


        public TourFacade(ITourService TourService, IUnitOfWorkAsync unitOfWork, ITourTranslationService typeTranslationService, IManageStorage manageStorage) : base(unitOfWork)
        {
            _TourService = TourService;
            _TourTranslationService = typeTranslationService;
            _manageStorage = manageStorage; 
        }

        public TourFacade(ITourService TourService, ITourTranslationService typeTranslationService, IManageStorage manageStorage )
        {
            _TourService = TourService;
            _TourTranslationService = typeTranslationService;
            _manageStorage = manageStorage; 
        }

        public TourDto GetTour(long TourId, int tenantId)
        {
            return Mapper.Map<TourDto>(_TourService.Query(x => x.TourId == TourId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public TourDto CreateTour(TourDto TourDto, int userId, int tenantId, List<MemoryStream> files, string path)
        {
            if (GetTour(TourDto.TourId, tenantId) != null)
            {
                return EditTour(TourDto, userId, tenantId, files, path, 1);
            }
            ValidateTour(TourDto, tenantId);
            var TourObj = Mapper.Map<Tour>(TourDto);
            foreach (var TourName in TourDto.TitleDictionary)
            {
                TourObj.TourTranslations.Add(new TourTranslation
                {
                    Title = TourName.Value,
                    Description = TourDto.DescriptionDictionary[TourName.Key],
                    Language = TourName.Key,
                });
            }

            TourObj.TenantId = tenantId;



            TourObj.StartFrom = TourDto.StartFrom;
            TourObj.StartTo = TourDto.StartTo;
            TourObj.HotelTitle = TourDto.HotelTitle;
            TourObj.MekkaDays = TourDto.MekkaDays;
            TourObj.MadinaDays = TourDto.MadinaDays;
            TourObj.Price = TourDto.Price;
            TourObj.CreationTime = Strings.CurrentDateTime;
            TourObj.CreatorUserId = userId;



            _TourTranslationService.InsertRange(TourObj.TourTranslations);
            _TourService.Insert(TourObj);

            SaveChanges();
            var imageId = 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Tour-" + TourObj.TourId, memoryStream, imageId.ToString());
                imageId++;
            }
            return TourDto;
        }

        public TourDto EditTour(TourDto TourDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter)
        {
            var TourObj = _TourService.Query(x => x.TourId == TourDto.TourId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (TourObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            //  ValidateTour(TourDto, tenantId);
            foreach (var TourName in TourDto.TitleDictionary)
            {
                var TourTranslation = TourObj.TourTranslations.FirstOrDefault(x => x.Language.ToLower() == TourName.Key.ToLower()
                && x.TourId == TourDto.TourId);
                if (TourTranslation == null)
                {
                    TourObj.TourTranslations.Add(new TourTranslation
                    {
                        Title = TourName.Value,
                        Description = TourDto.DescriptionDictionary[TourName.Key],
                        Language = TourName.Key
                    });
                }
                else
                {
                    TourTranslation.Title = TourName.Value;
                    TourTranslation.Description = TourDto.DescriptionDictionary[TourName.Key];

                }
            }
             
            TourObj.StartFrom = TourDto.StartFrom;
            TourObj.StartTo = TourDto.StartTo;
            TourObj.HotelTitle = TourDto.HotelTitle;
            TourObj.MekkaDays = TourDto.MekkaDays;
            TourObj.MadinaDays = TourDto.MadinaDays; 
            TourObj.Price = TourDto.Price;
            TourObj.LastModificationTime = Strings.CurrentDateTime;
            TourObj.LastModifierUserId = userId;
            TourObj.IsDeleted = TourDto.IsDeleted;

        
            _TourService.Update(TourObj);
            SaveChanges();
            var imageId = imageCounter + 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Tour-" + TourObj.TourId, memoryStream, imageId.ToString());
                imageId++;
            }
            return TourDto;

        }

        public PagedResultsDto GetAllTours(int page, int pageSize, int tenantId)
        {
            return _TourService.GetAllTours(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineTours(int page, int pageSize, int tenantId)
        {
            return _TourService.GetAllOnlineTours(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineRelatedToursById(long TourId, int page, int pageSize, int tenantId)
        {
            return _TourService.GetAllOnlineRelatedToursById(TourId, page, pageSize, tenantId);
        }
        private void ValidateTour(TourDto TourDto, long tenantId)
        {
            foreach (var name in TourDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_TourTranslationService.CheckNameExist(name.Value, name.Key, TourDto.TourId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
