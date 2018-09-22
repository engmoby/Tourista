using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICareerFormService : IService<CareerForm>
    {
         PagedResultsDto GetAllCareerForms(int page, int pageSize, int tenantId);
    }
}
