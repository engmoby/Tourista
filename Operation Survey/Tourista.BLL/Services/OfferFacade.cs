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
    public class OfferFacade : BaseFacade, IOfferFacade
    {
        private readonly IOfferService _OfferService;
        private readonly IOfferTranslationService _OfferTranslationService;
        private readonly IManageStorage _manageStorage; 


        public OfferFacade(IOfferService OfferService, IUnitOfWorkAsync unitOfWork, IOfferTranslationService typeTranslationService, IManageStorage manageStorage) : base(unitOfWork)
        {
            _OfferService = OfferService;
            _OfferTranslationService = typeTranslationService;
            _manageStorage = manageStorage; 
        }

        public OfferFacade(IOfferService OfferService, IOfferTranslationService typeTranslationService, IManageStorage manageStorage )
        {
            _OfferService = OfferService;
            _OfferTranslationService = typeTranslationService;
            _manageStorage = manageStorage; 
        }

        public OfferDto GetOffer(long OfferId, int tenantId)
        {
            return Mapper.Map<OfferDto>(_OfferService.Query(x => x.OfferId == OfferId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public OfferDto CreateOffer(OfferDto OfferDto, int userId, int tenantId, List<MemoryStream> files, string path)
        {
            if (GetOffer(OfferDto.OfferId, tenantId) != null)
            {
                return EditOffer(OfferDto, userId, tenantId, files, path, 1);
            }
            ValidateOffer(OfferDto, tenantId);
            var OfferObj = Mapper.Map<Offer>(OfferDto);
            foreach (var OfferName in OfferDto.TitleDictionary)
            {
                OfferObj.OfferTranslations.Add(new OfferTranslation
                {
                    Title = OfferName.Value,
                    Description = OfferDto.DescriptionDictionary[OfferName.Key],
                    Language = OfferName.Key,
                });
            }

            OfferObj.TenantId = tenantId;
            OfferObj.CityId = OfferDto.CityId;
            OfferObj.TypeId = OfferDto.TypeId;
            OfferObj.HotelId = OfferDto.HotelId;
            OfferObj.HotelTitle= OfferDto.HotelTitle;
            OfferObj.DaysCount = OfferDto.DaysCount;
            OfferObj.NigthsCount = OfferDto.NigthsCount;
            OfferObj.Star = OfferDto.Star;
            OfferObj.PriceBefore = OfferDto.PriceBefore;
            OfferObj.Price = OfferDto.Price;
            OfferObj.CreationTime = Strings.CurrentDateTime;
            OfferObj.CreatorUserId = userId;
            OfferObj.CurrencyId = OfferDto.CurrencyId;

            OfferObj.DateFrom = OfferDto.DateFrom;
            OfferObj.DateTo = OfferDto.DateTo;


            _OfferTranslationService.InsertRange(OfferObj.OfferTranslations);
            _OfferService.Insert(OfferObj);

            SaveChanges();
            var imageId = 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Offer-" + OfferObj.OfferId, memoryStream, imageId.ToString());
                imageId++;
            }
            return OfferDto;
        }

        public OfferDto EditOffer(OfferDto OfferDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter)
        {
            var OfferObj = _OfferService.Query(x => x.OfferId == OfferDto.OfferId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (OfferObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            //  ValidateOffer(OfferDto, tenantId);
            foreach (var OfferName in OfferDto.TitleDictionary)
            {
                var OfferTranslation = OfferObj.OfferTranslations.FirstOrDefault(x => x.Language.ToLower() == OfferName.Key.ToLower()
                && x.OfferId == OfferDto.OfferId);
                if (OfferTranslation == null)
                {
                    OfferObj.OfferTranslations.Add(new OfferTranslation
                    {
                        Title = OfferName.Value,
                        Description = OfferDto.DescriptionDictionary[OfferName.Key],
                        Language = OfferName.Key
                    });
                }
                else
                {
                    OfferTranslation.Title = OfferName.Value;
                    OfferTranslation.Description = OfferDto.DescriptionDictionary[OfferName.Key];

                }
            }

            OfferObj.CityId = OfferDto.CityId; 
            OfferObj.TypeId = OfferDto.TypeId;
            OfferObj.HotelId = OfferDto.HotelId;
            OfferObj.HotelTitle = OfferDto.HotelTitle;
            OfferObj.DaysCount = OfferDto.DaysCount;
            OfferObj.NigthsCount = OfferDto.NigthsCount;
            OfferObj.Star = OfferDto.Star;
            OfferObj.PriceBefore = OfferDto.PriceBefore;
            OfferObj.Price = OfferDto.Price;
            OfferObj.LastModificationTime = Strings.CurrentDateTime;
            OfferObj.LastModifierUserId = userId;
            OfferObj.IsDeleted = OfferDto.IsDeleted;
            OfferObj.CurrencyId = OfferDto.CurrencyId;

            OfferObj.DateFrom = OfferDto.DateFrom;
            OfferObj.DateTo = OfferDto.DateTo;

            _OfferService.Update(OfferObj);
            SaveChanges();
            var imageId = imageCounter + 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Offer-" + OfferObj.OfferId, memoryStream, imageId.ToString());
                imageId++;
            }
            return OfferDto;

        }

        public PagedResultsDto GetAllOffers(int page, int pageSize, int tenantId)
        {
            return _OfferService.GetAllOffers(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineOffers(int page, int pageSize, int tenantId)
        {
            return _OfferService.GetAllOnlineOffers(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineRelatedOffersById(long OfferId, int page, int pageSize, int tenantId)
        {
            return _OfferService.GetAllOnlineRelatedOffersById(OfferId, page, pageSize, tenantId);
        }
        private void ValidateOffer(OfferDto OfferDto, long tenantId)
        {
            foreach (var name in OfferDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_OfferTranslationService.CheckNameExist(name.Value, name.Key, OfferDto.OfferId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
