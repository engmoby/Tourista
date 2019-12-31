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
    public class CareerService : Service<Career>, ICareerService
    {
        public CareerService(IRepositoryAsync<Career> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllCareers(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => !x.IsDeleted && (x.TenantId == tenantId || x.TenantId == null)).OrderBy(x => x.CareerId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =   query.OrderBy(x => x.CareerId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<Career>, List<CareerDto>>(modelReturn); 
            return results;
        }

    }
}