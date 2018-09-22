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
    public class CityService : Service<City>, ICityService
    {
        public CityService(IRepositoryAsync<City> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllCitys(int page, int pageSize,int tenantId)
        {  

            var query = Queryable().Where(x => !x.IsDeleted && (x.TenantId == tenantId || x.TenantId == null)).OrderBy(x => x.CityId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();

            results.Data = Mapper.Map<List<City>, List<CityDto>>(query.OrderBy(x => x.CityId).Skip((page - 1) * pageSize).Take(pageSize).ToList());

            return results;

        }

    }
}