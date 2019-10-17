using System.Collections.Generic;
using System.IO;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ITourFacade
    { 
        TourDto GetTour(long userId, int tenantId); 
        TourDto CreateTour(TourDto userDto, int userId, int tenantId, List<MemoryStream> files, string path); 
        TourDto EditTour(TourDto userDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter);
        PagedResultsDto GetAllTours(int page, int pageSize, int tenantId); 
        PagedResultsDto GetAllOnlineTours(int page, int pageSize, int tenantId);
        PagedResultsDto GetAllOnlineRelatedToursById(long TourId, int page, int pageSize, int tenantId);
    }
}
