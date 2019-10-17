using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ITourTranslationService : IService<TourTranslation>
    {
        PagedResultsDto GetAllTours();
        PagedResultsDto GetAllToursTranslation(string language);
        PagedResultsDto GetTourTranslationByTourId(string language, long TourId);
        TourDto TourTranslationByTourId(string language, long TourId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
