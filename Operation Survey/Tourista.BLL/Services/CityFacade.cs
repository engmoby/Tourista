using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using Tourista.Common;
using Tourista.Common.CustomException;
using Repository.Pattern.UnitOfWork;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class CityFacade : BaseFacade, ICityFacade
    {
        private readonly ICityService _CityService;
        private readonly ICityTranslationService _typeTranslationService;

        public CityFacade(ICityService CityService, IUnitOfWorkAsync unitOfWork, ICityTranslationService typeTranslationService) : base(unitOfWork)
        {
            _CityService = CityService;
            _typeTranslationService = typeTranslationService;
        }

        public CityFacade(ICityService CityService, ICityTranslationService typeTranslationService)
        {
            _CityService = CityService;
            _typeTranslationService = typeTranslationService;
        }

        public CityDto GetCity(long CityId, int tenantId)
        {
            return Mapper.Map<CityDto>(_CityService.Query(x => x.CityId == CityId && x.TenantId == tenantId)
                .Select().FirstOrDefault());
        }

        public CityDto CreateCity(CityDto CityDto, int userId, int tenantId)
        {
            if (GetCity(CityDto.CityId, tenantId) != null)
            {
                return EditCity(CityDto, userId, tenantId);
            }
            ValidateCity(CityDto, tenantId);
            var CityObj = Mapper.Map<City>(CityDto);
            foreach (var CityName in CityDto.TitleDictionary)
            {
                CityObj.CityTranslations.Add(new CityTranslation
                {
                    Title = CityName.Value,
                    Language = CityName.Key, 
                });
            }

            CityObj.CreationTime = Strings.CurrentDateTime;
            CityObj.CreatorUserId = userId;
            CityObj.TenantId = tenantId;
            _typeTranslationService.InsertRange(CityObj.CityTranslations);
            _CityService.Insert(CityObj);
            SaveChanges();
            return CityDto;
        }

        public CityDto EditCity(CityDto CityDto, int userId, int tenantId)
        { 
            var CityObj = _CityService.Query(x => x.CityId == CityDto.CityId && x.TenantId == tenantId)
                .Select().FirstOrDefault();
            if (CityObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateCity(CityDto, tenantId);
            foreach (var CityName in CityDto.TitleDictionary)
            {
                var CityTranslation = CityObj.CityTranslations.FirstOrDefault(x => x.Language.ToLower() == CityName.Key.ToLower() && x.CityId == CityDto.CityId);
                if (CityTranslation == null)
                {
                    CityObj.CityTranslations.Add(new CityTranslation
                    {
                        Title = CityName.Value,
                        Language = CityName.Key
                    });
                }
                else
                    CityTranslation.Title = CityName.Value;
            }
            CityObj.LastModificationTime = Strings.CurrentDateTime;
            CityObj.LastModifierUserId = userId;
            CityObj.IsDeleted = CityDto.IsDeleted;
             
            _CityService.Update(CityObj);
            SaveChanges();
            return CityDto;

        }

        public PagedResultsDto GetAllCitys(int page, int pageSize, int tenantId)
        {
            return _CityService.GetAllCitys(page, pageSize, tenantId);
        }

        private void ValidateCity(CityDto CityDto, long tenantId)
        {
            foreach (var name in CityDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_typeTranslationService.CheckNameExist(name.Value, name.Key, CityDto.CityId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
