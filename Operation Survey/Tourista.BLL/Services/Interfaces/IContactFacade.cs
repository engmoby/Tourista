using System;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IContactFacade
    {
        ContactDto GetContact(long ContactId, int tenantId);
        ContactDto EditContact(ContactDto ContactDto, int userId, int tenantId);
        PagedResultsDto GetAllContacts(int page, int pageSize, int tenantId);
    }
}
