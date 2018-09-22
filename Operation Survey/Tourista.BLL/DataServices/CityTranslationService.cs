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
    public class CityTranslationService : Service<CityTranslation>, ICityTranslationService
    {
        public CityTranslationService(IRepositoryAsync<CityTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllCitys()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.City.IsDeleted ).Select(x => x.City).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.City.IsDeleted).Select().ToList();
            var Citys = _repository.Query(x => !x.City.IsDeleted ).Select(x => x.City)
                .OrderBy(x => x.CityId).ToList();
            results.Data = Mapper.Map<List<City>, List<CityDto>>(Citys);
            return results;
        }
        public PagedResultsDto GetAllCitysTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.City).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Citys = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.City)
                .OrderBy(x => x.CityId).ToList();
            results.Data = Mapper.Map<List<City>, List<CityDto>>(Citys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (City City in src)
                        {
                            City.CityTranslations = City.CityTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetCityTranslationByCityId(string language,long CityId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.CityId == CityId).Select(x => x.City).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Citys = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower() && x.CityId == CityId).Select(x => x.City)
                .OrderBy(x => x.CityId).ToList();
            results.Data = Mapper.Map<List<City>, List<CityDto>>(Citys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (City City in src)
                        {
                            City.CityTranslations = City.CityTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public CityDto CityTranslationByCityId(string language, long CityId)
        {
            var aaax = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Citys = _repository.Query(x => !x.City.IsDeleted && x.Language.ToLower() == language.ToLower() && x.CityId == CityId).Select(x => x.City)
                .OrderBy(x => x.CityId).FirstOrDefault();
            var results = Mapper.Map<City, CityDto>(Citys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.CityTranslations = src.CityTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }

        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.CityId != recordId && x.City.TenantId == tenantId && !x.City.IsDeleted);
        }
    }
}