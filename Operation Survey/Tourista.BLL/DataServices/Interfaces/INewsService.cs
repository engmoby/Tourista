using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface INewsService : IService<News>
    {
         PagedResultsDto GetAllNewss(int page, int pageSize, int tenantId);
         PagedResultsDto GetAllOnlineNewss(int page, int pageSize, int tenantId);
         PagedResultsDto GetAllOnlineRandomRelatedNews(int page, int pageSize, int tenantId);
         PagedResultsDto GetAllOnlineRelatedNewsById(long newsId, int page, int pageSize, int tenantId);
    }
}
