using System;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ICityFacade
    {
        CityDto GetCity(long CityId, int tenantId);
        CityDto CreateCity(CityDto userDto, int userId, int tenantId);
        CityDto EditCity(CityDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllCitys(int page, int pageSize, int tenantId); 
    }
}
