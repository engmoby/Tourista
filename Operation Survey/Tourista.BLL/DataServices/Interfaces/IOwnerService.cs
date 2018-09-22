using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IOwnerService : IService<Owner>
    {
         PagedResultsDto GetAllOwners(int page, int pageSize, int tenantId);
    }
}
