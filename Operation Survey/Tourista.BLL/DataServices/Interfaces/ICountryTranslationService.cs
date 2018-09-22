using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICountryTranslationService : IService<CountryTranslation>
    {
        PagedResultsDto GetAllCountrys();
        PagedResultsDto GetAllCountrysTranslation(string language);
        PagedResultsDto GetCountryTranslationByCountryId(string language, long CountryId);
        CountryDto CountryTranslationByCountryId(string language, long CountryId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
