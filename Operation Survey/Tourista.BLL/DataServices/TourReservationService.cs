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
    public class TourReservationService : Service<TourReservation>, ITourReservationService
    {
        public TourReservationService(IRepositoryAsync<TourReservation> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllTourReservations(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x =>  x.TenantId == tenantId ).OrderBy(x => x.TourReservationId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =   query.OrderBy(x => x.TourReservationId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<TourReservation>, List<TourReservationDto>>(modelReturn); 
            return results;
        }

    }
}