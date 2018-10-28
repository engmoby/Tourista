
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic; 

namespace Tourista.API.Controllers
{
    public class ContactController : BaseApiController
    { 
        private readonly IContactFacade _ContactFacade;
        public ContactController(IContactFacade ContactFacade)
        {
            _ContactFacade = ContactFacade; 
        }

        [Route("api/Contact/GetAllContact", Name = "GetAllContact")]
        [HttpGet]
        public IHttpActionResult GetAllContact(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto ContactObj = _ContactFacade.GetAllContacts(page, pagesize, TenantId);
            var data = Mapper.Map<List<ContactModel>>(ContactObj.Data);
            return Ok(data);
            return PagedResponse("GetAllContact", page, pagesize, ContactObj.TotalCount, data, ContactObj.IsParentTranslated);
        }

 


        [Route("api/Contact/EditContact", Name = "EditContact")]
        [HttpPost]
        public IHttpActionResult EditContact([FromBody] ContactModel ContactModel)
        {
            var reurnContact = _ContactFacade.EditContact(Mapper.Map<ContactDto>(ContactModel), UserId, TenantId);

            return Ok(reurnContact);
        }


        [Route("api/Contact/GetContactById", Name = "GetContactById")]
        [HttpGet]
        public IHttpActionResult GetContactById(long ContactUsId)
        {
            var reurnContact = _ContactFacade.GetContact(ContactUsId, TenantId);
            return Ok(reurnContact);
        }
    }

}