﻿using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IHotelService : IService<Hotel>
    {
         PagedResultsDto GetAllHotels(int page, int pageSize, int tenantId);
         PagedResultsDto GetHotelByCityId(long cityId);
        PagedResultsDto GetAllOnlineHotels(int page, int pageSize, int tenantId);
        PagedResultsDto GetAllOnlineRelatedHotelsById(long hotelId, int page, int pageSize, int tenantId);
    }
}
