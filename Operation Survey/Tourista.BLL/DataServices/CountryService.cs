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
    public class CountryService : Service<Country>, ICountryService
    {
        public CountryService(IRepositoryAsync<Country> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllCountrys(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => !x.IsDeleted && (x.TenantId == tenantId || x.TenantId == null)).OrderBy(x => x.CountryId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            // results.TotalCount = _repository.Query(x => !x.IsDeleted).Select().Count(x => !x.IsDeleted);
            var modelReturn = pageSize > 0
                ? query.OrderBy(x => x.CountryId).Skip((page - 1) * pageSize).Take(pageSize).ToList()
                : query.Where(x => x.Cityes.Count > 0).OrderBy(x => x.CountryId).ToList();
            results.Data = Mapper.Map<List<Country>, List<CountryDto>>(modelReturn);

            //var products = _repository.Query(x => !x.IsDeleted).Include(p => p.CountryTranslations).Select().OrderBy(x => x.CountryId).ToList();
            //results.Data = Mapper.Map<List<Country>, List<CountryDto>>(products);
            return results;
        }

    }
}