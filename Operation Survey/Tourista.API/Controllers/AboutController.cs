
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic; 

namespace Tourista.API.Controllers
{
    public class AboutController : BaseApiController
    { 
        private readonly IAboutFacade _AboutFacade;
        public AboutController(IAboutFacade AboutFacade)
        {
            _AboutFacade = AboutFacade; 
        }

        [Route("api/About/GetAllAbout", Name = "GetAllAbout")]
        [HttpGet]
        public IHttpActionResult GetAllAbout(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto AboutObj = _AboutFacade.GetAllAbouts(page, pagesize, TenantId);
            var data = Mapper.Map<List<AboutModel>>(AboutObj.Data);
            return PagedResponse("GetAllAbout", page, pagesize, AboutObj.TotalCount, data, AboutObj.IsParentTranslated);
        }

 


        [Route("api/About/EditAbout", Name = "EditAbout")]
        [HttpPost]
        public IHttpActionResult EditAbout([FromBody] AboutModel AboutModel)
        {
            var reurnAbout = _AboutFacade.EditAbout(Mapper.Map<AboutDto>(AboutModel), UserId, TenantId);

            return Ok(reurnAbout);
        }


        [Route("api/About/GetAboutById", Name = "GetAboutById")]
        [HttpGet]
        public IHttpActionResult GetAboutById(long AboutId)
        {
            var reurnAbout = _AboutFacade.GetAbout(AboutId, TenantId);
            return Ok(reurnAbout);
        }
    }

}