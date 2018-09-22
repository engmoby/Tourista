using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IHotelReservationService : IService<HotelReservation>
    {
         PagedResultsDto GetAllHotelReservations(int page, int pageSize, int tenantId);
    }
}
