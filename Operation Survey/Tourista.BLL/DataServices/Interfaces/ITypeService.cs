using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ITypeService : IService<Type>
    {
         PagedResultsDto GetAllTypes(int page, int pageSize, int tenantId);
    }
}
