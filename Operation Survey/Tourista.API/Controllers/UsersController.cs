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
    public class UsersController : BaseApiController
    {
        private readonly IUserService _userService; 
        private readonly IUserFacade _userFacade;  
        public UsersController(IUserFacade userFacade, IUserService userService)
        {
            _userFacade = userFacade;
            _userService = userService; 
        } 
        [Route("api/Users", Name = "RegisterUser")]
        [HttpPost]
        public IHttpActionResult RegisterUser([FromBody] UserModel userModel)
        {
            var reurnUser = _userFacade.RegisterUser(Mapper.Map<UserDto>(userModel), UserId, TenantId); 
            return Ok(reurnUser);
        } 
        [Route("api/Users/EditRegisterUser", Name = "EditRegisterUser")]
        [HttpPost]
        public IHttpActionResult EditRegisterUser([FromBody] UserModel userModel)
        {
            var reurnUser = _userFacade.EditUserInfo(Mapper.Map<UserDto>(userModel), UserId, TenantId);
 
            return Ok(reurnUser);
        }

        [Route("api/Users/GetAllSystemUsers", Name = "GetAllSystemUsers")]
        [HttpGet]
        public IHttpActionResult GetAllSystemUsers(int page = Page, int pagesize = PageSize)
        {
            var getAllDataForuser = _userService.GetAllSystemUsers(page, pagesize, TenantId);
            var userList = Mapper.Map<List<UserModel>>(getAllDataForuser.Data);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = getAllDataForuser.TotalCount;
            results.Data = Mapper.Map<List<UserModel>, List<UserDto>>(userList);
            return PagedResponse("GetAllSystemUsers", Page, PageSize, results.TotalCount, userList, results.IsParentTranslated);
        }

        [Route("api/Users/GetAllUsers", Name = "GetAllUsers")]
        [HttpGet]
        public IHttpActionResult GetAllUsers(int page = Page, int pagesize = PageSize)
        {
            var getAllDataForuser = _userService.GetAllUsers(page, pagesize, TenantId);
            var userList = Mapper.Map<List<UserModel>>(getAllDataForuser.Data); 
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = getAllDataForuser.TotalCount;
            results.Data = Mapper.Map<List<UserModel>, List<UserDto>>(userList); 
            return PagedResponse("GetAllUsers", Page, PageSize, results.TotalCount, userList, results.IsParentTranslated); 
        }
         
        [Route("api/Users/GetUserById", Name = "GetUserById")]
        [HttpGet]
        public IHttpActionResult GetUserById(long userId)
        {
            var reurnUser = _userFacade.GetUser(userId, TenantId);
            return Ok(reurnUser);
        }
        

        //[Route("api/Users/GetMaxAndConUsers", Name = "GetMaxAndConUsers")]
        //[HttpGet]
        //public IHttpActionResult GetMaxAndConUsers()
        //{
        //    UserConsumedModel maxCon = Mapper.Map<UserConsumedModel>(_userFacade.GetMaxAndConsumedUsers(TenantId));

        //    return Ok(maxCon);

        //}

        //[Route("api/Users/Register", Name = "Register")]
        //[HttpPost]
        //public IHttpActionResult Register([FromBody] AdminModel adminModel)
        //{
        //    //if (Request.Headers.Authorization.Scheme == "X-Auth-Token" &&
        //    //    Request.Headers.Authorization.Parameter == "asdasdas")

        //    _userFacade.AddNewGlobalUser(Mapper.Map<AdminDto>(adminModel));
        //    return Ok();
        //    //return Unauthorized();
        //}

        //[Route("api/Users/", Name = "UpdateGlobalUser")]
        //[HttpPut]
        //public IHttpActionResult UpdateGlobalUser([FromBody] AdminModel adminModel)
        //{
        //    //if (Request.Headers.Authorization.Scheme == "X-Auth-Token" &&
        //    //    Request.Headers.Authorization.Parameter == "asdasdas")

        //    _userFacade.UpdateGlobalUser(Mapper.Map<AdminDto>(adminModel));
        //    return Ok();
        //    //return Unauthorized();
        //}
        //[Route("api/Users/Package", Name = "UpdatePackage")]
        //[HttpPut]
        //public IHttpActionResult UpdatePackage([FromBody] AdminModel adminModel)
        //{
        //    //if (Request.Headers.Authorization.Scheme == "X-Auth-Token" &&
        //    //    Request.Headers.Authorization.Parameter == "asdasdas")

        //    _userFacade.UpdateAdminPackage(Mapper.Map<AdminDto>(adminModel));
        //    return Ok();
        //    //return Unauthorized();
        //}

        //[Route("api/Users/Departments", Name = "GetAllDepartmentsByUserId")]
        //[HttpGet]
        //public IHttpActionResult GetAllDepartmentsByUserId()
        //{
        //    var data = Mapper.Map<DepartmentModel>(_departmentFacade.GetAllDepartmentByUserId(UserId));
        //    return Ok(data);
        //}
 

    }

}