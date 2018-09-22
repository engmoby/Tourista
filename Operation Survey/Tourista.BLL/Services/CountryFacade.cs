using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class CountryFacade : BaseFacade, ICountryFacade
    {
        private readonly ICountryService _countryService;
        private readonly ICountryTranslationService _typeTranslationService; 


        public CountryFacade(ICountryService countryService, IUnitOfWorkAsync unitOfWork, ICountryTranslationService typeTranslationService) : base(unitOfWork)
        {
            _countryService = countryService;
            _typeTranslationService = typeTranslationService; 
        }

        public CountryFacade(ICountryService countryService, ICountryTranslationService typeTranslationService)
        {
            _countryService = countryService;
            _typeTranslationService = typeTranslationService; 
        }

        public CountryDto GetCountry(long countryId, int tenantId)
        {
            return Mapper.Map<CountryDto>(_countryService.Query(x => x.CountryId == countryId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public CountryDto CreateCountry(CountryDto countryDto, int userId, int tenantId)
        {
            if (GetCountry(countryDto.CountryId, tenantId) != null)
            {
                return EditCountry(countryDto, userId, tenantId);
            }
            ValidateCountry(countryDto, tenantId);
            var countryObj = Mapper.Map<Country>(countryDto);
            foreach (var countryName in countryDto.TitleDictionary)
            {
                countryObj.CountryTranslations.Add(new CountryTranslation
                {
                    Title = countryName.Value,
                    Language = countryName.Key, 
                });
            }

            countryObj.CreationTime = Strings.CurrentDateTime;
            countryObj.CreatorUserId = userId;
            countryObj.TenantId = tenantId;
            _typeTranslationService.InsertRange(countryObj.CountryTranslations);
            _countryService.Insert(countryObj);
            SaveChanges();
            return countryDto;
        }

        public CountryDto EditCountry(CountryDto countryDto, int userId, int tenantId)
        { 
            var countryObj = _countryService.Query(x => x.CountryId == countryDto.CountryId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (countryObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateCountry(countryDto, tenantId);
            foreach (var countryName in countryDto.TitleDictionary)
            {
                var countryTranslation = countryObj.CountryTranslations.FirstOrDefault(x => x.Language.ToLower() == countryName.Key.ToLower() 
                && x.CountryId == countryDto.CountryId);
                if (countryTranslation == null)
                {
                    countryObj.CountryTranslations.Add(new CountryTranslation
                    {
                        Title = countryName.Value,
                        Language = countryName.Key
                    });
                }
                else
                    countryTranslation.Title = countryName.Value;
            }

            countryObj.LastModificationTime = Strings.CurrentDateTime;
            countryObj.LastModifierUserId = userId;
            countryObj.IsDeleted = countryDto.IsDeleted; 
            _countryService.Update(countryObj);
            SaveChanges();
            return countryDto;

        }

        public PagedResultsDto GetAllCountrys(int page, int pageSize, int tenantId)
        {
            return _countryService.GetAllCountrys(page, pageSize, tenantId);
        }

     
        private void ValidateCountry(CountryDto countryDto, long tenantId)
        {
            foreach (var name in countryDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_typeTranslationService.CheckNameExist(name.Value, name.Key, countryDto.CountryId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
