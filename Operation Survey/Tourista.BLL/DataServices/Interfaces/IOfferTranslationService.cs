using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IOfferTranslationService : IService<OfferTranslation>
    {
        PagedResultsDto GetAllOffers();
        PagedResultsDto GetAllOffersTranslation(string language);
        PagedResultsDto GetOfferTranslationByOfferId(string language, long OfferId);
        OfferDto OfferTranslationByOfferId(string language, long OfferId);
        bool CheckNameExist(string objName, string language, long recordId, long tenantId);
    }
}
