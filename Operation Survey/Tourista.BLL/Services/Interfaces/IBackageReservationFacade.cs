using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IBackageReservationFacade
    { 
        BackageReservationDto GetBackageReservation(long userId, int tenantId); 
        BackageReservationDto CreateBackageReservation(BackageReservationDto userDto, int userId, int tenantId); 
        BackageReservationDto EditBackageReservation(BackageReservationDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllBackageReservations(int page, int pageSize, int tenantId); 
    }
}
