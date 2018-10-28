using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IConatctFormService : IService<Inquery>
    {
         PagedResultsDto GetAllConatctForms(int page, int pageSize, int tenantId);
    }
}
