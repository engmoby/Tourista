using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface INewsletterFacade
    { 
        NewsLetterDto GetNewsletter(long userId, int tenantId); 
        NewsLetterDto CreateNewsletter(NewsLetterDto userDto, int userId, int tenantId); 
        NewsLetterDto EditNewsletter(NewsLetterDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllNewsletters(int page, int pageSize, int tenantId); 
    }
}
