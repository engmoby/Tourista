using System.Collections.Generic;
using System.IO;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IOfferFacade
    { 
        OfferDto GetOffer(long userId, int tenantId); 
        OfferDto CreateOffer(OfferDto userDto, int userId, int tenantId, List<MemoryStream> files, string path); 
        OfferDto EditOffer(OfferDto userDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter);
        PagedResultsDto GetAllOffers(int page, int pageSize, int tenantId); 
        PagedResultsDto GetAllOnlineOffers(int page, int pageSize, int tenantId);
        PagedResultsDto GetAllOnlineRelatedOffersById(long OfferId, int page, int pageSize, int tenantId);
    }
}
