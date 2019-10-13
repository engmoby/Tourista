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
    public class OfferService : Service<Offer>, IOfferService
    {
        public OfferService(IRepositoryAsync<Offer> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetOfferByCityId(long cityId)
        {
            var query = Queryable().Where(x =>   x.CityId== cityId).OrderByDescending(x => x.OfferId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderByDescending(x => x.OfferId).ToList();
            results.Data = Mapper.Map<List<Offer>, List<OfferDto>>(modelReturn);
            return results;
        }
        public PagedResultsDto GetAllOffers(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => x.TenantId == tenantId  ).OrderBy(x => x.OfferId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =  query.OrderBy(x => x.OfferId).Skip((page - 1) * pageSize).Take(pageSize).ToList()
                ;
            results.Data = Mapper.Map<List<Offer>, List<OfferDto>>(modelReturn); 
            return results;
        }
        public PagedResultsDto GetAllOnlineOffers(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.TenantId == tenantId).OrderByDescending(x => x.OfferId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderByDescending(x => x.OfferId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Offer>, List<OfferDto>>(modelReturn);
            return results;
        }
        public PagedResultsDto GetAllOnlineRelatedOffersById(long OfferId,int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && x.OfferId != OfferId && (x.TenantId == tenantId)).OrderByDescending(x => Guid.NewGuid()).Take(10);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.OfferId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Offer>, List<OfferDto>>(modelReturn);
            return results;
        }
    }
}