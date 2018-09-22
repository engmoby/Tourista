using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ICurrencyFacade
    { 
        CurrencyDto GetCurrency(long userId, int tenantId); 
        CurrencyDto CreateCurrency(CurrencyDto userDto, int userId, int tenantId); 
        CurrencyDto EditCurrency(CurrencyDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllCurrencys(int page, int pageSize, int tenantId); 
    }
}
