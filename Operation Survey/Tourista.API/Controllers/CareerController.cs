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
    public class CareersController : BaseApiController
    {
        private readonly ICareerService _careerService; 
        private readonly ICareerFacade _careerFacade;  
        public CareersController(ICareerFacade careerFacade, ICareerService careerService)
        {
            _careerFacade = careerFacade;
            _careerService = careerService; 
        }

        [Route("api/Careers", Name = "CreateCareer")]
        [HttpPost]
        public IHttpActionResult CreateCareer([FromBody] CareerModel careerModel)
        {
            var reurnCareer = _careerFacade.CreateCareer(Mapper.Map<CareerDto>(careerModel), UserId, TenantId); 
            return Ok(reurnCareer);
        }

        [Route("api/Careers/EditCareer", Name = "EditCareer")]
        [HttpPost]
        public IHttpActionResult EditCareer([FromBody] CareerModel careerModel)
        {
            var reurnCareer = _careerFacade.EditCareer(Mapper.Map<CareerDto>(careerModel), UserId, TenantId);
 
            return Ok(reurnCareer);
        }
          
        [Route("api/Careers/GetAllCareers", Name = "GetAllCareers")]
        [HttpGet]
        public IHttpActionResult GetAllCareers(int page = Page, int pagesize = PageSize)
        {
            var getAllDataForCareer = _careerService.GetAllCareers(page, pagesize, TenantId);
            var careerList = Mapper.Map<List<CareerModel>>(getAllDataForCareer.Data); 
            //PagedResultsDto results = new PagedResultsDto();
            //results.TotalCount = getAllDataForCareer.TotalCount;
            //results.Data = Mapper.Map<List<CareerModel>, List<CareerDto>>(careerList); 
            return Ok(careerList);

          //  return PagedResponse("GetAllCareers", Page, PageSize, results.TotalCount, careerList, results.IsParentTranslated); 
        }
         
        [Route("api/Careers/GetCareerById", Name = "GetCareerById")]
        [HttpGet]
        public IHttpActionResult GetCareerById(long careerId)
        {
            var reurnCareer = _careerFacade.GetCareer(careerId, TenantId);
            return Ok(reurnCareer);
        }
        
         
    }

}