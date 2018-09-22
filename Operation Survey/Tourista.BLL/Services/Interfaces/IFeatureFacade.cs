using System.IO;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IFeatureFacade
    { 
        FeatureDto GetFeature(long userId, int tenantId); 
        FeatureDto CreateFeature(FeatureDto userDto, int userId, int tenantId, MemoryStream files, string path); 
        FeatureDto EditFeature(FeatureDto userDto, int userId, int tenantId, MemoryStream files, string path);
        PagedResultsDto GetAllFeatures(int page, int pageSize, int tenantId); 
    }
}
