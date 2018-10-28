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
    public class NewslettersController : BaseApiController
    {
        private readonly INewsLetterService _NewsletterService; 
        private readonly INewsletterFacade _NewsletterFacade;  
        public NewslettersController(INewsletterFacade NewsletterFacade, INewsLetterService NewsletterService)
        {
            _NewsletterFacade = NewsletterFacade;
            _NewsletterService = NewsletterService; 
        }

        [Route("api/Newsletters", Name = "CreateNewsletter")]
        [HttpPost]
        public IHttpActionResult CreateNewsletter([FromBody] NewsLetterModel NewsLetterModel)
        {
            var reurnNewsletter = _NewsletterFacade.CreateNewsletter(Mapper.Map<NewsLetterDto>(NewsLetterModel), UserId, TenantId); 
            return Ok(reurnNewsletter);
        }

        [Route("api/Newsletters/EditNewsletter", Name = "EditNewsletter")]
        [HttpPost]
        public IHttpActionResult EditNewsletter([FromBody] NewsLetterModel NewsLetterModel)
        {
            var reurnNewsletter = _NewsletterFacade.EditNewsletter(Mapper.Map<NewsLetterDto>(NewsLetterModel), UserId, TenantId);
 
            return Ok(reurnNewsletter);
        }
          
        [Route("api/Newsletters/GetAllNewsletters", Name = "GetAllNewsletters")]
        [HttpGet]
        public IHttpActionResult GetAllNewsletters(int page = Page, int pagesize = PageSize)
        {
            var getAllDataForNewsletter = _NewsletterService.GetAllNewsLetters(page, pagesize, TenantId);
            var NewsletterList = Mapper.Map<List<NewsLetterModel>>(getAllDataForNewsletter.Data); 
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = getAllDataForNewsletter.TotalCount;
            results.Data = Mapper.Map<List<NewsLetterModel>, List<NewsLetterDto>>(NewsletterList); 
            return PagedResponse("GetAllNewsletters", Page, PageSize, results.TotalCount, NewsletterList, results.IsParentTranslated); 
        }
         
        [Route("api/Newsletters/GetNewsletterById", Name = "GetNewsletterById")]
        [HttpGet]
        public IHttpActionResult GetNewsletterById(long NewsletterId)
        {
            var reurnNewsletter = _NewsletterFacade.GetNewsletter(NewsletterId, TenantId);
            return Ok(reurnNewsletter);
        }
        
         
    }

}