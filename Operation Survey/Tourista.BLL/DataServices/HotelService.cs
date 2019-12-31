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
    public class HotelService : Service<Hotel>, IHotelService
    {
        public HotelService(IRepositoryAsync<Hotel> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetHotelByCityId(long cityId)
        {
            var query = Queryable().Where(x =>   x.CityId== cityId).OrderByDescending(x => x.HotelId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderByDescending(x => x.HotelId).ToList();
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(modelReturn);
            return results;
        }
        public PagedResultsDto GetAllHotels(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => !x.IsDeleted && x.TenantId == tenantId  ).OrderBy(x => x.HotelId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =  query.OrderBy(x => x.HotelId).Skip((page - 1) * pageSize).Take(pageSize).ToList()
                ;
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(modelReturn); 
            return results;
        }
        public PagedResultsDto GetAllOnlineHotels(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.TenantId == tenantId).OrderBy(x => x.HotelId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderByDescending(x => x.HotelId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(modelReturn);
            return results;
        }
        public PagedResultsDto GetAllOnlineRelatedHotelsById(long hotelId,int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.HotelId != hotelId && (x.TenantId == tenantId)).OrderBy(x => Guid.NewGuid()).Take(10);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.HotelId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(modelReturn);
            return results;
        }
    }
}