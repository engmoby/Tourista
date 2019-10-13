using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IOfferReservationFacade
    { 
        OfferReservationDto GetOfferReservation(long userId, int tenantId); 
        OfferReservationDto CreateOfferReservation(OfferReservationDto userDto, int userId, int tenantId); 
        OfferReservationDto EditOfferReservation(OfferReservationDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllOfferReservations(int page, int pageSize, int tenantId); 
    }
}
