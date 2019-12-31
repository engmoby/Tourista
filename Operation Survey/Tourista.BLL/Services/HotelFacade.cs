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
    public class HotelFacade : BaseFacade, IHotelFacade
    {
        private readonly IHotelService _hotelService;
        private readonly IHotelTranslationService _hotelTranslationService;
        private readonly IManageStorage _manageStorage;
        private readonly IHotelFeatureService _hotelFeatureService;


        public HotelFacade(IHotelService hotelService, IUnitOfWorkAsync unitOfWork, IHotelTranslationService typeTranslationService, IManageStorage manageStorage, IHotelFeatureService hotelFeatureService) : base(unitOfWork)
        {
            _hotelService = hotelService;
            _hotelTranslationService = typeTranslationService;
            _manageStorage = manageStorage;
            _hotelFeatureService = hotelFeatureService;
        }

        public HotelFacade(IHotelService HotelService, IHotelTranslationService typeTranslationService, IManageStorage manageStorage, IHotelFeatureService hotelFeatureService)
        {
            _hotelService = HotelService;
            _hotelTranslationService = typeTranslationService;
            _manageStorage = manageStorage;
            _hotelFeatureService = hotelFeatureService;
        }

        public HotelDto GetHotel(long HotelId, int tenantId)
        {
            return Mapper.Map<HotelDto>(_hotelService.Query(x => x.HotelId == HotelId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public HotelDto CreateHotel(HotelDto hotelDto, int userId, int tenantId, List<MemoryStream> files, string path)
        {
            if (GetHotel(hotelDto.HotelId, tenantId) != null)
            {
                return EditHotel(hotelDto, userId, tenantId, files, path, 1);
            }
            ValidateHotel(hotelDto, tenantId);
            var hotelObj = Mapper.Map<Hotel>(hotelDto);
            foreach (var hotelName in hotelDto.TitleDictionary)
            {
                hotelObj.HotelTranslations.Add(new HotelTranslation
                {
                    Title = hotelName.Value,
                    Description = hotelDto.DescriptionDictionary[hotelName.Key],
                    Language = hotelName.Key,
                });
            }

            hotelObj.TenantId = tenantId;
            hotelObj.CityId = hotelDto.CityId;
            hotelObj.Latitude = hotelDto.Latitude;
            hotelObj.Longitude = hotelDto.Longitude;
            hotelObj.Star = hotelDto.Star;
            hotelObj.CreationTime = Strings.CurrentDateTime;
            hotelObj.CreatorUserId = userId;
            hotelObj.CurrencyId = hotelDto.CurrencyId;


            //foreach (var roleper in hotelDto.HotelFeature)
            //{
            //    hotelObj.HotelFeature.Add(new HotelFeature
            //    {
            //        FeatureId = roleper.FeatureId
            //    });
            //}
            _hotelFeatureService.InsertRange(hotelObj.HotelFeature);

            _hotelTranslationService.InsertRange(hotelObj.HotelTranslations);
            _hotelService.Insert(hotelObj);

            SaveChanges();
            var imageId = 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Hotel-" + hotelObj.HotelId, memoryStream, imageId.ToString());
                imageId++;
            }
            return hotelDto;
        }

        public HotelDto EditHotel(HotelDto hotelDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter)
        {
            var hotelObj = _hotelService.Query(x => x.HotelId == hotelDto.HotelId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (hotelObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            //  ValidateHotel(hotelDto, tenantId);
            foreach (var hotelName in hotelDto.TitleDictionary)
            {
                var hotelTranslation = hotelObj.HotelTranslations.FirstOrDefault(x => x.Language.ToLower() == hotelName.Key.ToLower()
                && x.HotelId == hotelDto.HotelId);
                if (hotelTranslation == null)
                {
                    hotelObj.HotelTranslations.Add(new HotelTranslation
                    {
                        Title = hotelName.Value,
                        Description = hotelDto.DescriptionDictionary[hotelName.Key],
                        Language = hotelName.Key
                    });
                }
                else
                {
                    hotelTranslation.Title = hotelName.Value;
                    hotelTranslation.Description = hotelDto.DescriptionDictionary[hotelName.Key];

                }
            }

            hotelObj.CityId = hotelDto.CityId;
            hotelObj.Latitude = hotelDto.Latitude;
            hotelObj.Longitude = hotelDto.Longitude;
            hotelObj.Star = hotelDto.Star;
            hotelObj.LastModificationTime = Strings.CurrentDateTime;
            hotelObj.LastModifierUserId = userId;
            hotelObj.IsDeleted = hotelDto.IsDeleted;
            hotelObj.CurrencyId = hotelDto.CurrencyId;

            var deleteFatures = new HotelFeature[hotelObj.HotelFeature.Count];
            hotelObj.HotelFeature.CopyTo(deleteFatures, 0);

            foreach (var objRolePermission in deleteFatures)
            {
                _hotelFeatureService.Delete(objRolePermission);

            }

            foreach (var roleper in hotelDto.HotelFeature)
            {
                if (hotelObj.HotelFeature.All(x => x.FeatureId != roleper.FeatureId))
                {
                    hotelObj.HotelFeature.Add(new HotelFeature
                    {
                        FeatureId = roleper.FeatureId
                    });
                }
            }
            _hotelFeatureService.InsertRange(hotelObj.HotelFeature);

            _hotelService.Update(hotelObj);
            SaveChanges();
            var imageId = 1; //imageCounter + 1;
            foreach (var memoryStream in files)
            {
                _manageStorage.UploadImage(path + "\\" + "Hotel-" + hotelObj.HotelId, memoryStream, imageId.ToString());
                imageId++;
            }
            return hotelDto;

        }

        public PagedResultsDto GetAllHotels(int page, int pageSize, int tenantId)
        {
            return _hotelService.GetAllHotels(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineHotels(int page, int pageSize, int tenantId)
        {
            return _hotelService.GetAllOnlineHotels(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineRelatedHotelsById(long hotelId, int page, int pageSize, int tenantId)
        {
            return _hotelService.GetAllOnlineRelatedHotelsById(hotelId, page, pageSize, tenantId);
        }
        private void ValidateHotel(HotelDto HotelDto, long tenantId)
        {
            foreach (var name in HotelDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_hotelTranslationService.CheckNameExist(name.Value, name.Key, HotelDto.HotelId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
