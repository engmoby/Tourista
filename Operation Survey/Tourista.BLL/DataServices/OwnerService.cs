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
    public class OwnerService : Service<Owner>, IOwnerService
    {
        public OwnerService(IRepositoryAsync<Owner> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetAllOwners(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => x.TenantId == tenantId).OrderBy(x => x.OwnerId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            // results.TotalCount = _repository.Query(x => !x.IsDeleted).Select().Count(x => !x.IsDeleted);
            var modelReturn = query.OrderBy(x => x.OwnerId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Owner>, List<OwnerDto>>(modelReturn);

            //var products = _repository.Query(x => !x.IsDeleted).Include(p => p.OwnerTranslations).Select().OrderBy(x => x.OwnerId).ToList();
            //results.Data = Mapper.Map<List<Owner>, List<OwnerDto>>(products);
            return results;
        }
        public PagedResultsDto GetAllOnlineOwners(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && (x.TenantId == tenantId)).OrderBy(x => x.OwnerId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.OwnerId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Owner>, List<OwnerDto>>(modelReturn);
            return results;
        }
    }
}