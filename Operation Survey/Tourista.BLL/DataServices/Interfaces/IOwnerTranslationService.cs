using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IOwnerTranslationService : IService<OwnerTranslation>
    {
        PagedResultsDto GetAllOwners();
        PagedResultsDto GetAllOwnersTranslation(string language);
        PagedResultsDto GetOwnerTranslationByOwnerId(string language, long OwnerId);
        OwnerDto OwnerTranslationByOwnerId(string language, long OwnerId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
