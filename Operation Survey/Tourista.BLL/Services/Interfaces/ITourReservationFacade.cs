using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ITourReservationFacade
    { 
        TourReservationDto GetTourReservation(long userId, int tenantId); 
        TourReservationDto CreateTourReservation(TourReservationDto userDto, int userId, int tenantId); 
        TourReservationDto EditTourReservation(TourReservationDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllTourReservations(int page, int pageSize, int tenantId); 
    }
}
