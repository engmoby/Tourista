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
    public class TourService : Service<Tour>, ITourService
    {
        public TourService(IRepositoryAsync<Tour> repository) : base(repository)
        {
            _repository = repository;
        }

        //public PagedResultsDto GetTourByCityId(long cityId)
        //{
        //    var query = Queryable().Where(x =>   x.CityId== cityId).OrderByDescending(x => x.TourId);
        //    PagedResultsDto results = new PagedResultsDto();
        //    results.TotalCount = query.Select(x => x).Count();
        //    var modelReturn = query.OrderByDescending(x => x.TourId).ToList();
        //    results.Data = Mapper.Map<List<Tour>, List<TourDto>>(modelReturn);
        //    return results;
        //}
        public PagedResultsDto GetAllTours(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => x.TenantId == tenantId  ).OrderBy(x => x.TourId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =  query.OrderBy(x => x.TourId).Skip((page - 1) * pageSize).Take(pageSize).ToList()
                ;
            results.Data = Mapper.Map<List<Tour>, List<TourDto>>(modelReturn); 
            return results;
        }
        public PagedResultsDto GetAllOnlineTours(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.TenantId == tenantId).OrderByDescending(x => x.TourId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderByDescending(x => x.TourId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Tour>, List<TourDto>>(modelReturn);
            return results;
        }
        public PagedResultsDto GetAllOnlineRelatedToursById(long TourId,int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.TourId != TourId && (x.TenantId == tenantId)).OrderByDescending(x => Guid.NewGuid()).Take(10);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.TourId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Tour>, List<TourDto>>(modelReturn);
            return results;
        }
    }
}