using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IContactService : IService<ContactUs>
    {
         PagedResultsDto GetAllContacts(int page, int pageSize, int tenantId);
    }
}
