using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ITourService : IService<Tour>
    {
         PagedResultsDto GetAllTours(int page, int pageSize, int tenantId);
         //PagedResultsDto GetTourByCityId(long cityId);
        PagedResultsDto GetAllOnlineTours(int page, int pageSize, int tenantId);
        PagedResultsDto GetAllOnlineRelatedToursById(long TourId, int page, int pageSize, int tenantId);
    }
}
