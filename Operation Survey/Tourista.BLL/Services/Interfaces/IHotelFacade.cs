using System.Collections.Generic;
using System.IO;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IHotelFacade
    { 
        HotelDto GetHotel(long userId, int tenantId); 
        HotelDto CreateHotel(HotelDto userDto, int userId, int tenantId, List<MemoryStream> files, string path); 
        HotelDto EditHotel(HotelDto userDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter);
        PagedResultsDto GetAllHotels(int page, int pageSize, int tenantId); 
        PagedResultsDto GetAllOnlineHotels(int page, int pageSize, int tenantId);
    }
}
