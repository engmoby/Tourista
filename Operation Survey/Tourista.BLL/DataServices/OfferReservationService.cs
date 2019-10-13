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
    public class OfferReservationService : Service<OfferReservation>, IOfferReservationService
    {
        public OfferReservationService(IRepositoryAsync<OfferReservation> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllOfferReservations(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x =>  x.TenantId == tenantId ).OrderBy(x => x.OfferReservationId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =   query.OrderBy(x => x.OfferReservationId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<OfferReservation>, List<OfferReservationDto>>(modelReturn); 
            return results;
        }

    }
}