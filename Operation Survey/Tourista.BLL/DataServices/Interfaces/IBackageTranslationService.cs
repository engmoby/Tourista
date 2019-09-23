using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IBackageTranslationService : IService<BackageTranslation>
    {
        PagedResultsDto GetAllBackages();
        PagedResultsDto GetAllBackagesTranslation(string language);
        PagedResultsDto GetBackageTranslationByBackageId(string language, long BackageId);
        BackageDto BackageTranslationByBackageId(string language, long BackageId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
