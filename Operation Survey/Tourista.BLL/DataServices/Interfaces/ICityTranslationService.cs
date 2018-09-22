using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICityTranslationService : IService<CityTranslation>
    {
        PagedResultsDto GetAllCitys();
        PagedResultsDto GetAllCitysTranslation(string language);
        PagedResultsDto GetCityTranslationByCityId(string language, long CityId);
        CityDto CityTranslationByCityId(string language, long CityId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
