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
    public class CurrencyService : Service<Currency>, ICurrencyService
    {
        public CurrencyService(IRepositoryAsync<Currency> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllCurrencys(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => !x.IsDeleted && (x.TenantId == tenantId || x.TenantId == null)).OrderBy(x => x.CurrencyId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            // results.TotalCount = _repository.Query(x => !x.IsDeleted).Select().Count(x => !x.IsDeleted);
            var modelReturn =  query.OrderBy(x => x.CurrencyId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<Currency>, List<CurrencyDto>>(modelReturn);

            //var products = _repository.Query(x => !x.IsDeleted).Include(p => p.CurrencyTranslations).Select().OrderBy(x => x.CurrencyId).ToList();
            //results.Data = Mapper.Map<List<Currency>, List<CurrencyDto>>(products);
            return results;
        }

    }
}