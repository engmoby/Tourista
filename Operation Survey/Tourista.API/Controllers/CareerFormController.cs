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
    public class CareerFormsController : BaseApiController
    {
        private readonly ICareerFormService _careerFormService; 
        private readonly ICareerFormFacade _careerFormFacade;  
        public CareerFormsController(ICareerFormFacade careerFormFacade, ICareerFormService careerFormService)
        {
            _careerFormFacade = careerFormFacade;
            _careerFormService = careerFormService; 
        }

        [Route("api/CareerForms", Name = "CreateCareerForm")]
        [HttpPost]
        public IHttpActionResult CreateCareerForm([FromBody] CareerFormModel careerFormModel)
        {
            var reurnCareerForm = _careerFormFacade.CreateCareerForm(Mapper.Map<CareerFormDto>(careerFormModel), UserId, TenantId); 
            return Ok(reurnCareerForm);
        }

        [Route("api/CareerForms/EditCareerForm", Name = "EditCareerForm")]
        [HttpPost]
        public IHttpActionResult EditCareerForm([FromBody] CareerFormModel careerFormModel)
        {
            var reurnCareerForm = _careerFormFacade.EditCareerForm(Mapper.Map<CareerFormDto>(careerFormModel), UserId, TenantId);
 
            return Ok(reurnCareerForm);
        }
          
        [Route("api/CareerForms/GetAllCareerForms", Name = "GetAllCareerForms")]
        [HttpGet]
        public IHttpActionResult GetAllCareerForms(int page = Page, int pagesize = PageSize)
        {
            var getAllDataForCareerForm = _careerFormService.GetAllCareerForms(page, pagesize, TenantId);
            var careerFormList = Mapper.Map<List<CareerFormModel>>(getAllDataForCareerForm.Data); 
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = getAllDataForCareerForm.TotalCount;
            results.Data = Mapper.Map<List<CareerFormModel>, List<CareerFormDto>>(careerFormList); 
            return PagedResponse("GetAllCareerForms", Page, PageSize, results.TotalCount, careerFormList, results.IsParentTranslated); 
        }
         
        [Route("api/CareerForms/GetCareerFormById", Name = "GetCareerFormById")]
        [HttpGet]
        public IHttpActionResult GetCareerFormById(long careerFormId)
        {
            var reurnCareerForm = _careerFormFacade.GetCareerForm(careerFormId, TenantId);
            return Ok(reurnCareerForm);
        }
        
         
    }

}