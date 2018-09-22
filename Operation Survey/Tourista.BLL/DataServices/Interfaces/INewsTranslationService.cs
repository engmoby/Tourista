using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface INewsTranslationService : IService<NewsTranslation>
    {
        PagedResultsDto GetAllNewss();
        PagedResultsDto GetAllNewssTranslation(string language);
        PagedResultsDto GetNewsTranslationByNewsId(string language, long NewsId);
        NewsDto NewsTranslationByNewsId(string language, long NewsId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
