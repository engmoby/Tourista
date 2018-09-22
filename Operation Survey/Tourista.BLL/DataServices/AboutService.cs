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
    public class AboutService : Service<About>, IAboutService
    {
        public AboutService(IRepositoryAsync<About> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetAllAbouts(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => x.TenantId == tenantId).OrderBy(x => x.AboutId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn = query.OrderBy(x => x.AboutId).Skip((page - 1) * pageSize).Take(pageSize).ToList()
               ;
            results.Data = Mapper.Map<List<About>, List<AboutDto>>(modelReturn);
             
            return results;
        }

    }
}