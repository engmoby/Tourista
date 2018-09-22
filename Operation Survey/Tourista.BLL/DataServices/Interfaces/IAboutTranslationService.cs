using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IAboutTranslationService : IService<AboutTranslation>
    {
        PagedResultsDto GetAllAbouts();
        PagedResultsDto GetAllAboutsTranslation(string language);
        PagedResultsDto GetAboutTranslationByAboutId(string language, long AboutId);
        AboutDto AboutTranslationByAboutId(string language, long AboutId); 
    }
}
