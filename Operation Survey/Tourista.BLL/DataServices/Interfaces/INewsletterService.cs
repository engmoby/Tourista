using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface INewsLetterService : IService<NewsLetter>
    {
         PagedResultsDto GetAllNewsLetters(int page, int pageSize, int tenantId);
    }
}
