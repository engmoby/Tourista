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
    public class HotelReservationService : Service<HotelReservation>, IHotelReservationService
    {
        public HotelReservationService(IRepositoryAsync<HotelReservation> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllHotelReservations(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x =>  x.TenantId == tenantId ).OrderBy(x => x.HotelReservationId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =   query.OrderBy(x => x.HotelReservationId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<HotelReservation>, List<HotelReservationDto>>(modelReturn); 
            return results;
        }

    }
}