using System;
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
    public class BackageService : Service<Backage>, IBackageService
    {
        public BackageService(IRepositoryAsync<Backage> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetBackageByCityId(long cityId)
        {
            var query = Queryable().Where(x =>   x.CityId== cityId).OrderByDescending(x => x.BackageId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderByDescending(x => x.BackageId).ToList();
            results.Data = Mapper.Map<List<Backage>, List<BackageDto>>(modelReturn);
            return results;
        }
        public PagedResultsDto GetAllBackages(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => x.TenantId == tenantId  ).OrderBy(x => x.BackageId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =  query.OrderBy(x => x.BackageId).Skip((page - 1) * pageSize).Take(pageSize).ToList()
                ;
            results.Data = Mapper.Map<List<Backage>, List<BackageDto>>(modelReturn); 
            return results;
        }
        public PagedResultsDto GetAllOnlineBackages(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.TenantId == tenantId).OrderByDescending(x => x.BackageId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderByDescending(x => x.BackageId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Backage>, List<BackageDto>>(modelReturn);
            return results;
        }
        public PagedResultsDto GetAllOnlineRelatedBackagesById(long BackageId,int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.BackageId != BackageId && (x.TenantId == tenantId)).OrderByDescending(x => Guid.NewGuid()).Take(10);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.BackageId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Backage>, List<BackageDto>>(modelReturn);
            return results;
        }
    }
}