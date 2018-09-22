using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICityService : IService<City>
    {
         PagedResultsDto GetAllCitys(int page, int pageSize, int tenantId);
    }
}
