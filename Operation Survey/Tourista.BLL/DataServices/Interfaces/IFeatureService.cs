using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IFeatureService : IService<Feature>
    {
         PagedResultsDto GetAllFeatures(int page, int pageSize, int tenantId);
    }
}
