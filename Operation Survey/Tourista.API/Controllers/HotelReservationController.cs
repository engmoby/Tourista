
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic;

namespace Tourista.API.Controllers
{
    public class HotelReservationController : BaseApiController
    {
        private readonly IHotelReservationFacade _hotelReservationFacade;
        private readonly IUserFacade _userFacade;
        public HotelReservationController(IHotelReservationFacade hotelReservationFacade, IUserFacade userFacade)
        {
            _hotelReservationFacade = hotelReservationFacade;
            _userFacade = userFacade;
        }

        [Route("api/HotelReservations/GetAllHotelReservations", Name = "GetAllHotelReservations")]
        [HttpGet]
        public IHttpActionResult GetAllHotelReservations(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto hotelReservationObj = _hotelReservationFacade.GetAllHotelReservations(page, pagesize, TenantId);

            //var afterMap = new List<HotelReservationModel>();
            //afterMap = Mapper.Map<List<HotelReservationModel>>(hotelReservationObj.Data);
            var data = Mapper.Map<List<HotelReservationModel>>(hotelReservationObj.Data);

            foreach (var item in data)
            {
                var userAction = _userFacade.GetUser((long)item.SeenUserId, 0);
                var userCreate = _userFacade.GetUser((long)item.CreatorUserId, 0);
                item.User = Mapper.Map<UserModel>(userCreate);
                item.SeenUser = Mapper.Map<UserModel>(userAction);
            }

            return PagedResponse("GetAllHotelReservations", page, pagesize, hotelReservationObj.TotalCount, data, hotelReservationObj.IsParentTranslated);
        }


        [Route("api/HotelReservations", Name = "CreateHotelReservation")]
        [HttpPost]
        public IHttpActionResult CreateHotelReservation([FromBody] HotelReservationModel hotelReservationModel)
        {
            var userDto = new UserDto();
            userDto.FullName = hotelReservationModel.User.FullName;
            userDto.Email = hotelReservationModel.User.Email;
            userDto.Phone = hotelReservationModel.User.Phone;
            userDto.IsSystemUser = false;
            var saveUser = _userFacade.RegisterClient(userDto, 0, 0);
            hotelReservationModel.UserId = saveUser.UserId;
            var reurnHotelReservation = _hotelReservationFacade.CreateHotelReservation(Mapper.Map<HotelReservationDto>(hotelReservationModel), UserId, TenantId);

            return Ok(reurnHotelReservation);
        }


        [Route("api/HotelReservations/EditHotelReservation", Name = "EditHotelReservation")]
        [HttpPost]
        public IHttpActionResult EditHotelReservation([FromBody] HotelReservationModel hotelReservationModel)
        {
            var reurnHotelReservation = _hotelReservationFacade.EditHotelReservation(Mapper.Map<HotelReservationDto>(hotelReservationModel), UserId, TenantId);

            return Ok(reurnHotelReservation);
        }


        [Route("api/HotelReservations/GetHotelReservationById", Name = "GetHotelReservationById")]
        [HttpGet]
        public IHttpActionResult GetHotelReservationById(long hotelReservationId)
        {
            var reurnHotelReservation = _hotelReservationFacade.GetHotelReservation(hotelReservationId, TenantId);


            var userCreate = _userFacade.GetUser((long)reurnHotelReservation.CreatorUserId, 0);
            var userAction = _userFacade.GetUser((long)reurnHotelReservation.SeenUserId, 0);
            reurnHotelReservation.User = Mapper.Map<UserDto>(userCreate);
            reurnHotelReservation.SeenUser = Mapper.Map<UserDto>(userAction);


            return Ok(reurnHotelReservation);
        }
    }

}