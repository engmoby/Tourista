using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ITypeTranslationService : IService<TypeTranslation>
    {
        PagedResultsDto GetAllTypes();
        PagedResultsDto GetAllTypesTranslation(string language);
        PagedResultsDto GetTypeTranslationByTypeId(string language, long TypeId);
        TypeDto TypeTranslationByTypeId(string language, long TypeId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
