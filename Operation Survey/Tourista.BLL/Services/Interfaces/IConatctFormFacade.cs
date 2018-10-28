using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IConatctFormFacade
    {
        ContactFormDto GetContactForm(long userId, int tenantId);
        ContactFormDto CreateConatctForm(ContactFormDto userDto, int userId, int tenantId);
        ContactFormDto EditContactForm(ContactFormDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllContactForms(int page, int pageSize, int tenantId); 
    }
}
