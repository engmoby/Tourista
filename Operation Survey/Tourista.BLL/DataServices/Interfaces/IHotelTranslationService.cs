using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IHotelTranslationService : IService<HotelTranslation>
    {
        PagedResultsDto GetAllHotels();
        PagedResultsDto GetAllHotelsTranslation(string language);
        PagedResultsDto GetHotelTranslationByHotelId(string language, long HotelId);
        HotelDto HotelTranslationByHotelId(string language, long HotelId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
