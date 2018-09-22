using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICountryService : IService<Country>
    {
         PagedResultsDto GetAllCountrys(int page, int pageSize, int tenantId);
    }
}
