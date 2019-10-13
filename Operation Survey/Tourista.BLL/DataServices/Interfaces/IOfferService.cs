using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IOfferService : IService<Offer>
    {
         PagedResultsDto GetAllOffers(int page, int pageSize, int tenantId);
         PagedResultsDto GetOfferByCityId(long cityId);
        PagedResultsDto GetAllOnlineOffers(int page, int pageSize, int tenantId);
        PagedResultsDto GetAllOnlineRelatedOffersById(long OfferId, int page, int pageSize, int tenantId);
    }
}
