
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic; 

namespace Tourista.API.Controllers
{
    public class CityController : BaseApiController
    { 
        private readonly ICityFacade _CityFacade;
        public CityController(ICityFacade CityFacade)
        {
            _CityFacade = CityFacade; 
        }

        [Route("api/Cities/GetAllCities", Name = "GetAllCities")]
        [HttpGet]
        public IHttpActionResult GetAllCities(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto CityObj = _CityFacade.GetAllCitys(page, pagesize, TenantId);
            var data = Mapper.Map<List<CityModel>>(CityObj.Data);
            return PagedResponse("GetAllAreas", page, pagesize, CityObj.TotalCount, data, CityObj.IsParentTranslated);
        }


        [Route("api/Cities", Name = "CreateCity")]
        [HttpPost]
        public IHttpActionResult CreateCity([FromBody] CityModel CityModel)
        {
            var reurnCity = _CityFacade.CreateCity(Mapper.Map<CityDto>(CityModel), UserId, TenantId);

            return Ok(reurnCity);
        }


        [Route("api/Cities/EditCity", Name = "EditCity")]
        [HttpPost]
        public IHttpActionResult EditCity([FromBody] CityModel CityModel)
        {
            var reurnCity = _CityFacade.EditCity(Mapper.Map<CityDto>(CityModel), UserId, TenantId);

            return Ok(reurnCity);
        }


        [Route("api/Cities/GetCityById", Name = "GetCityById")]
        [HttpGet]
        public IHttpActionResult GetCityById(long CityId)
        {
            var reurnCity = _CityFacade.GetCity(CityId, TenantId);
            return Ok(reurnCity);
        }
    }

}