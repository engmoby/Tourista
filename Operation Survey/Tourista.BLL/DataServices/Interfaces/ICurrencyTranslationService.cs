using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICurrencyTranslationService : IService<CurrencyTranslation>
    {
        PagedResultsDto GetAllCurrencys();
        PagedResultsDto GetAllCurrencysTranslation(string language);
        PagedResultsDto GetCurrencyTranslationByCurrencyId(string language, long CurrencyId);
        CurrencyDto CurrencyTranslationByCurrencyId(string language, long CurrencyId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
