using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IAboutService : IService<About>
    {
         PagedResultsDto GetAllAbouts(int page, int pageSize, int tenantId);
    }
}
