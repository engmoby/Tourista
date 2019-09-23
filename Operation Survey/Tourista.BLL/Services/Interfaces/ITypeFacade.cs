using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ITypeFacade
    { 
        TypeDto GetType(long userId, int tenantId); 
        TypeDto CreateType(TypeDto userDto, int userId, int tenantId); 
        TypeDto EditType(TypeDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllTypes(int page, int pageSize, int tenantId); 
    }
}
