
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic; 

namespace Tourista.API.Controllers
{
    public class CurrencyController : BaseApiController
    { 
        private readonly ICurrencyFacade _CurrencyFacade;
        public CurrencyController(ICurrencyFacade CurrencyFacade)
        {
            _CurrencyFacade = CurrencyFacade; 
        }

        [Route("api/Currencies/GetAllCurrencies", Name = "GetAllCurrencies")]
        [HttpGet]
        public IHttpActionResult GetAllCurrencies(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto currencyObj = _CurrencyFacade.GetAllCurrencys(page, pagesize, TenantId);
            var data = Mapper.Map<List<CurrencyModel>>(currencyObj.Data);
            return PagedResponse("GetAllCurrencies", page, pagesize, currencyObj.TotalCount, data, currencyObj.IsParentTranslated);
        }


        [Route("api/Currencies", Name = "CreateCurrency")]
        [HttpPost]
        public IHttpActionResult CreateCurrency([FromBody] CurrencyModel CurrencyModel)
        {
            var reurnCurrency = _CurrencyFacade.CreateCurrency(Mapper.Map<CurrencyDto>(CurrencyModel),UserId, TenantId);

            return Ok(reurnCurrency);
        }


        [Route("api/Currencies/EditCurrency", Name = "EditCurrency")]
        [HttpPost]
        public IHttpActionResult EditCurrency([FromBody] CurrencyModel CurrencyModel)
        {
            var reurnCurrency = _CurrencyFacade.EditCurrency(Mapper.Map<CurrencyDto>(CurrencyModel), UserId, TenantId);

            return Ok(reurnCurrency);
        }


        [Route("api/Currencies/GetCurrencyById", Name = "GetCurrencyById")]
        [HttpGet]
        public IHttpActionResult GetCurrencyById(long CurrencyId)
        {
            var reurnCurrency = _CurrencyFacade.GetCurrency(CurrencyId, TenantId);
            return Ok(reurnCurrency);
        }
    }

}