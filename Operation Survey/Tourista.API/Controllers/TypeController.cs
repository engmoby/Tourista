
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic; 

namespace Tourista.API.Controllers
{
    public class TypeController : BaseApiController
    { 
        private readonly ITypeFacade _TypeFacade;
        public TypeController(ITypeFacade TypeFacade)
        {
            _TypeFacade = TypeFacade; 
        }

        [Route("api/Types/GetAllTypes", Name = "GetAllTypes")]
        [HttpGet]
        public IHttpActionResult GetAllTypes(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto TypeObj = _TypeFacade.GetAllTypes(page, pagesize, TenantId);
            var data = Mapper.Map<List<TypeModel>>(TypeObj.Data);
            return PagedResponse("GetAllTypes", page, pagesize, TypeObj.TotalCount, data, TypeObj.IsParentTranslated);
        }


        [Route("api/Types", Name = "CreateType")]
        [HttpPost]
        public IHttpActionResult CreateType([FromBody] TypeModel TypeModel)
        {
            var reurnType = _TypeFacade.CreateType(Mapper.Map<TypeDto>(TypeModel),UserId, TenantId);

            return Ok(reurnType);
        }


        [Route("api/Types/EditType", Name = "EditType")]
        [HttpPost]
        public IHttpActionResult EditType([FromBody] TypeModel TypeModel)
        {
            var reurnType = _TypeFacade.EditType(Mapper.Map<TypeDto>(TypeModel), UserId, TenantId);

            return Ok(reurnType);
        }


        [Route("api/Types/GetTypeById", Name = "GetTypeById")]
        [HttpGet]
        public IHttpActionResult GetTypeById(long TypeId)
        {
            var reurnType = _TypeFacade.GetType(TypeId, TenantId);
            return Ok(reurnType);
        }
    }

}