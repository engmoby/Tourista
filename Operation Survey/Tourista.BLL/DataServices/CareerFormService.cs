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
    public class CareerFormService : Service<CareerForm>, ICareerFormService
    {
        public CareerFormService(IRepositoryAsync<CareerForm> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllCareerForms(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x =>   (x.TenantId == tenantId || x.TenantId == null)).OrderBy(x => x.CareerFormId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =   query.OrderBy(x => x.CareerFormId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<CareerForm>, List<CareerFormDto>>(modelReturn); 
            return results;
        }

    }
}