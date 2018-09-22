using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICurrencyService : IService<Currency>
    {
         PagedResultsDto GetAllCurrencys(int page, int pageSize, int tenantId);
    }
}
