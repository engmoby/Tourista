using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IHotelService : IService<Hotel>
    {
         PagedResultsDto GetAllHotels(int page, int pageSize, int tenantId);
         PagedResultsDto GetAllOnlineHotels(int page, int pageSize, int tenantId);
    }
}
