using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ITourReservationService : IService<TourReservation>
    {
         PagedResultsDto GetAllTourReservations(int page, int pageSize, int tenantId);
    }
}
