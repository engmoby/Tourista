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
        
        public PagedResultsDto GetAllHotels(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => x.TenantId == tenantId  ).OrderBy(x => x.HotelId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn =  query.OrderBy(x => x.HotelId).Skip((page - 1) * pageSize).Take(pageSize).ToList()
                ;
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(modelReturn); 
            return results;
        }

    }
}