using System.Collections.Generic;
using System.IO;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface INewsFacade
    { 
        NewsDto GetNews(long userId, int tenantId); 
        NewsDto CreateNews(NewsDto userDto, int userId, int tenantId, MemoryStream file, string path); 
        NewsDto EditNews(NewsDto userDto, int userId, int tenantId, MemoryStream file, string path);
        PagedResultsDto GetAllNewss(int page, int pageSize, int tenantId); 
        PagedResultsDto GetAllOnlineNewss(int page, int pageSize, int tenantId);
    }
}
