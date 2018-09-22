using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface ICareerService : IService<Career>
    {
         PagedResultsDto GetAllCareers(int page, int pageSize, int tenantId);
    }
}
