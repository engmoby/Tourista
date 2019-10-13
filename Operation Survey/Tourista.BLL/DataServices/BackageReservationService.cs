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
    public class BackageReservationService : Service<BackageReservation>, IBackageReservationService
    {
        public BackageReservationService(IRepositoryAsync<BackageReservation> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllBackageReservations(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x =>  x.TenantId == tenantId ).OrderBy(x => x.BackageReservationId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =   query.OrderBy(x => x.BackageReservationId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<BackageReservation>, List<BackageReservationDto>>(modelReturn); 
            return results;
        }

    }
}