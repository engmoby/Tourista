using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic;
using Tourista.BLL.DataServices.Interfaces;

namespace Tourista.API.Controllers
{
    public class ContactFormsController : BaseApiController
    {
        private readonly IConatctFormService _ContactFormService; 
        private readonly IConatctFormFacade _ContactFormFacade;  
        public ContactFormsController(IConatctFormFacade ContactFormFacade, IConatctFormService ContactFormService)
        {
            _ContactFormFacade = ContactFormFacade;
            _ContactFormService = ContactFormService; 
        }

        [Route("api/ContactForms", Name = "CreateContactForm")]
        [HttpPost]
        public IHttpActionResult CreateContactForm([FromBody] ContactFormModel ContactFormModel)
        {
            var reurnContactForm = _ContactFormFacade.CreateConatctForm(Mapper.Map<ContactFormDto>(ContactFormModel), UserId, TenantId); 
            return Ok(reurnContactForm);
        }

        [Route("api/ContactForms/EditContactForm", Name = "EditContactForm")]
        [HttpPost]
        public IHttpActionResult EditContactForm([FromBody] ContactFormModel ContactFormModel)
        {
            var reurnContactForm = _ContactFormFacade.EditContactForm(Mapper.Map<ContactFormDto>(ContactFormModel), UserId, TenantId);
 
            return Ok(reurnContactForm);
        }
          
        [Route("api/ContactForms/GetAllContactForms", Name = "GetAllContactForms")]
        [HttpGet]
        public IHttpActionResult GetAllContactForms(int page = Page, int pagesize = PageSize)
        {
            var getAllDataForContactForm = _ContactFormService.GetAllConatctForms(page, pagesize, TenantId);
            var ContactFormList = Mapper.Map<List<ContactFormModel>>(getAllDataForContactForm.Data); 
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = getAllDataForContactForm.TotalCount;
            results.Data = Mapper.Map<List<ContactFormModel>, List<ContactFormDto>>(ContactFormList); 
            return PagedResponse("GetAllContactForms", Page, PageSize, results.TotalCount, ContactFormList, results.IsParentTranslated); 
        }
         
        [Route("api/ContactForms/GetContactFormById", Name = "GetContactFormById")]
        [HttpGet]
        public IHttpActionResult GetContactFormById(long ContactFormId)
        {
            var reurnContactForm = _ContactFormFacade.GetContactForm(ContactFormId, TenantId);
            return Ok(reurnContactForm);
        }
        
         
    }

}