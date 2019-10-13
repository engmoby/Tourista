using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IOfferReservationService : IService<OfferReservation>
    {
         PagedResultsDto GetAllOfferReservations(int page, int pageSize, int tenantId);
    }
}
