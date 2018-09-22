using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IFeatureTranslationService : IService<FeatureTranslation>
    {
        PagedResultsDto GetAllFeatures();
        PagedResultsDto GetAllFeaturesTranslation(string language);
        PagedResultsDto GetFeatureTranslationByFeatureId(string language, long FeatureId);
        FeatureDto FeatureTranslationByFeatureId(string language, long FeatureId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
