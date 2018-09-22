
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic; 

namespace Tourista.API.Controllers
{
    public class CountryController : BaseApiController
    { 
        private readonly ICountryFacade _CountryFacade;
        public CountryController(ICountryFacade CountryFacade)
        {
            _CountryFacade = CountryFacade; 
        }

        [Route("api/Countries/GetAllCountries", Name = "GetAllCountries")]
        [HttpGet]
        public IHttpActionResult GetAllCountries(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto CountryObj = _CountryFacade.GetAllCountrys(page, pagesize, TenantId);
            var data = Mapper.Map<List<CountryModel>>(CountryObj.Data);
            return PagedResponse("GetAllCountries", page, pagesize, CountryObj.TotalCount, data, CountryObj.IsParentTranslated);
        }


        [Route("api/Countries", Name = "CreateCountry")]
        [HttpPost]
        public IHttpActionResult CreateCountry([FromBody] CountryModel CountryModel)
        {
            var reurnCountry = _CountryFacade.CreateCountry(Mapper.Map<CountryDto>(CountryModel),UserId, TenantId);

            return Ok(reurnCountry);
        }


        [Route("api/Countries/EditCountry", Name = "EditCountry")]
        [HttpPost]
        public IHttpActionResult EditCountry([FromBody] CountryModel CountryModel)
        {
            var reurnCountry = _CountryFacade.EditCountry(Mapper.Map<CountryDto>(CountryModel), UserId, TenantId);

            return Ok(reurnCountry);
        }


        [Route("api/Countries/GetCountryById", Name = "GetCountryById")]
        [HttpGet]
        public IHttpActionResult GetCountryById(long CountryId)
        {
            var reurnCountry = _CountryFacade.GetCountry(CountryId, TenantId);
            return Ok(reurnCountry);
        }
    }

}