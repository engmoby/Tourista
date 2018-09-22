using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace Tourista.BLL.DataServices
{
    public class ContactService : Service<ContactUs>, IContactService
    {
        public ContactService(IRepositoryAsync<ContactUs> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetAllContacts(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => x.TenantId == tenantId).OrderBy(x => x.ContactUsId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count(); 
            var modelReturn = query.OrderBy(x => x.ContactUsId
            ).Skip((page - 1) * pageSize).Take(pageSize).ToList()
               ;
            results.Data = Mapper.Map<List<ContactUs>, List<ContactDto>>(modelReturn);
             
            return results;
        }

    }
}