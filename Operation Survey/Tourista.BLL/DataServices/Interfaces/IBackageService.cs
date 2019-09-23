using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IBackageService : IService<Backage>
    {
         PagedResultsDto GetAllBackages(int page, int pageSize, int tenantId);
         PagedResultsDto GetBackageByCityId(long cityId);
        PagedResultsDto GetAllOnlineBackages(int page, int pageSize, int tenantId);
        PagedResultsDto GetAllOnlineRelatedBackagesById(long BackageId, int page, int pageSize, int tenantId);
    }
}
