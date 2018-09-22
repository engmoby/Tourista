
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IContactTranslationService : IService<ContactUsTranslation>
    {
        PagedResultsDto GetAllContacts();
        PagedResultsDto GetAllContactsTranslation(string language);
        PagedResultsDto GetContactUsTranslationByContactId(string language, long ContactId);
        ContactDto ContactUsTranslationByContactId(string language, long ContactId); 
    }
}
