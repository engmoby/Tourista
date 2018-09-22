using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ICareerFacade
    { 
        CareerDto GetCareer(long userId, int tenantId); 
        CareerDto CreateCareer(CareerDto userDto, int userId, int tenantId); 
        CareerDto EditCareer(CareerDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllCareers(int page, int pageSize, int tenantId); 
    }
}
