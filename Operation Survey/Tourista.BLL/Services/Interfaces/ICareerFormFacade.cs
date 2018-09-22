using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ICareerFormFacade
    { 
        CareerFormDto GetCareerForm(long userId, int tenantId); 
        CareerFormDto CreateCareerForm(CareerFormDto userDto, int userId, int tenantId); 
        CareerFormDto EditCareerForm(CareerFormDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllCareerForms(int page, int pageSize, int tenantId); 
    }
}
