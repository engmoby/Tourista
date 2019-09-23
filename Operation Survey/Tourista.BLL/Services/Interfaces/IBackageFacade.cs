using System.Collections.Generic;
using System.IO;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IBackageFacade
    { 
        BackageDto GetBackage(long userId, int tenantId); 
        BackageDto CreateBackage(BackageDto userDto, int userId, int tenantId, List<MemoryStream> files, string path); 
        BackageDto EditBackage(BackageDto userDto, int userId, int tenantId, List<MemoryStream> files, string path, int imageCounter);
        PagedResultsDto GetAllBackages(int page, int pageSize, int tenantId); 
        PagedResultsDto GetAllOnlineBackages(int page, int pageSize, int tenantId);
        PagedResultsDto GetAllOnlineRelatedBackagesById(long BackageId, int page, int pageSize, int tenantId);
    }
}
