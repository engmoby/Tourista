using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IOwnerFacade
    { 
        OwnerDto GetOwner(long userId, int tenantId); 
        OwnerDto CreateOwner(OwnerDto userDto, int userId, int tenantId); 
        OwnerDto EditOwner(OwnerDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllOwners(int page, int pageSize, int tenantId); 
        PagedResultsDto GetAllOnlineOwners(int page, int pageSize, int tenantId);
    }
}
