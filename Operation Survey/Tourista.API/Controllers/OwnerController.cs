
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic; 

namespace Tourista.API.Controllers
{
    public class OwnerController : BaseApiController
    { 
        private readonly IOwnerFacade _OwnerFacade;
        public OwnerController(IOwnerFacade OwnerFacade)
        {
            _OwnerFacade = OwnerFacade; 
        }

        [Route("api/Owners/GetAllOwners", Name = "GetAllOwners")]
        [HttpGet]
        public IHttpActionResult GetAllOwners(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto OwnerObj = _OwnerFacade.GetAllOwners(page, pagesize, TenantId);
            var data = Mapper.Map<List<OwnerModel>>(OwnerObj.Data);
            return PagedResponse("GetAllOwners", page, pagesize, OwnerObj.TotalCount, data, OwnerObj.IsParentTranslated);
        }


        [Route("api/Owners", Name = "CreateOwner")]
        [HttpPost]
        public IHttpActionResult CreateOwner([FromBody] OwnerModel OwnerModel)
        {
            var reurnOwner = _OwnerFacade.CreateOwner(Mapper.Map<OwnerDto>(OwnerModel),UserId, TenantId);

            return Ok(reurnOwner);
        }


        [Route("api/Owners/EditOwner", Name = "EditOwner")]
        [HttpPost]
        public IHttpActionResult EditOwner([FromBody] OwnerModel OwnerModel)
        {
            var reurnOwner = _OwnerFacade.EditOwner(Mapper.Map<OwnerDto>(OwnerModel), UserId, TenantId);

            return Ok(reurnOwner);
        }


        [Route("api/Owners/GetOwnerById", Name = "GetOwnerById")]
        [HttpGet]
        public IHttpActionResult GetOwnerById(long OwnerId)
        {
            var reurnOwner = _OwnerFacade.GetOwner(OwnerId, TenantId);
            return Ok(reurnOwner);
        }
    }

}