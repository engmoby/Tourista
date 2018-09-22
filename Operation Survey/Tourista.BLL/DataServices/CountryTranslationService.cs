using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace Tourista.BLL.DataServices
{
    public class CountryTranslationService : Service<CountryTranslation>, ICountryTranslationService
    {
        public CountryTranslationService(IRepositoryAsync<CountryTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllCountrys()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Country.IsDeleted ).Select(x => x.Country).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Country.IsDeleted).Select().ToList();
            var Countrys = _repository.Query(x => !x.Country.IsDeleted ).Select(x => x.Country)
                .OrderBy(x => x.CountryId).ToList();
            results.Data = Mapper.Map<List<Country>, List<CountryDto>>(Countrys);
            return results;
        }
        public PagedResultsDto GetAllCountrysTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Country).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Countrys = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Country)
                .OrderBy(x => x.CountryId).ToList();
            results.Data = Mapper.Map<List<Country>, List<CountryDto>>(Countrys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Country Country in src)
                        {
                            Country.CountryTranslations = Country.CountryTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetCountryTranslationByCountryId(string language,long CountryId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.CountryId == CountryId).Select(x => x.Country).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Countrys = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower() && x.CountryId == CountryId).Select(x => x.Country)
                .OrderBy(x => x.CountryId).ToList();
            results.Data = Mapper.Map<List<Country>, List<CountryDto>>(Countrys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Country Country in src)
                        {
                            Country.CountryTranslations = Country.CountryTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public CountryDto CountryTranslationByCountryId(string language, long CountryId)
        {
            var aaax = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Countrys = _repository.Query(x => !x.Country.IsDeleted && x.Language.ToLower() == language.ToLower() && x.CountryId == CountryId).Select(x => x.Country)
                .OrderBy(x => x.CountryId).FirstOrDefault();
            var results = Mapper.Map<Country, CountryDto>(Countrys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.CountryTranslations = src.CountryTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.CountryId != recordId && x.Country.TenantId == tenantId && !x.Country.IsDeleted);
        }

    }
}