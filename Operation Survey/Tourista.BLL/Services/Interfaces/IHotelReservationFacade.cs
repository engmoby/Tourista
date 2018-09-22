using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IHotelReservationFacade
    { 
        HotelReservationDto GetHotelReservation(long userId, int tenantId); 
        HotelReservationDto CreateHotelReservation(HotelReservationDto userDto, int userId, int tenantId); 
        HotelReservationDto EditHotelReservation(HotelReservationDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllHotelReservations(int page, int pageSize, int tenantId); 
    }
}
