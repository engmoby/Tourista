using System;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class HotelReservationFacade : BaseFacade, IHotelReservationFacade
    {
        private readonly IHotelReservationService _hotelReservationService;

        public HotelReservationFacade(IHotelReservationService hotelReservationService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _hotelReservationService = hotelReservationService;
        }

        public HotelReservationFacade(IHotelReservationService hotelReservationService)
        {
            _hotelReservationService = hotelReservationService;
        }

        public HotelReservationDto GetHotelReservation(long hotelReservationId, int tenantId)
        {
            return Mapper.Map<HotelReservationDto>(_hotelReservationService.Query(x => x.HotelReservationId == hotelReservationId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public HotelReservationDto CreateHotelReservation(HotelReservationDto hotelReservationDto, int userId, int tenantId)
        {
            long ticks = DateTime.Now.Ticks;
            if (GetHotelReservation(hotelReservationDto.HotelReservationId, tenantId) != null)
            {
                return EditHotelReservation(hotelReservationDto, userId, tenantId);
            }

            var hotelReservationObj = Mapper.Map<HotelReservation>(hotelReservationDto);
            hotelReservationObj.HotelId = hotelReservationDto.HotelId;
            hotelReservationObj.TickectNo = ticks.ToString();
            hotelReservationObj.CheckIn = hotelReservationDto.CheckIn;
            hotelReservationObj.CheckOut = hotelReservationDto.CheckOut;
            hotelReservationObj.Adult = hotelReservationDto.Adult;
            hotelReservationObj.Child = hotelReservationDto.Child;
            hotelReservationObj.UserId = hotelReservationDto.UserId;
            hotelReservationObj.RoomCount = hotelReservationDto.RoomCount;
            hotelReservationObj.Status = (int)Enums.Status.New;

            hotelReservationObj.CreationTime = Strings.CurrentDateTime;
            hotelReservationObj.CreatorUserId = hotelReservationDto.UserId;
            hotelReservationObj.TenantId = tenantId;
            hotelReservationObj.SeenUserId = 0;
            _hotelReservationService.Insert(hotelReservationObj);

            SaveChanges();
            hotelReservationDto.TickectNo = hotelReservationObj.TickectNo;
            return hotelReservationDto;
        }

        public HotelReservationDto EditHotelReservation(HotelReservationDto hotelReservationDto, int userId, int tenantId)
        {
            var hotelReservationObj = _hotelReservationService.Query(x => x.HotelReservationId == hotelReservationDto.HotelReservationId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (hotelReservationObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);

            hotelReservationObj.SeenUserId = userId;
            hotelReservationObj.Status = (int)hotelReservationDto.Status;
            hotelReservationObj.RoomCount = hotelReservationDto.RoomCount;
            hotelReservationObj.Adult = hotelReservationDto.Adult;
            hotelReservationObj.Child = hotelReservationDto.Child;

            hotelReservationObj.LastModificationTime = Strings.CurrentDateTime;
            hotelReservationObj.LastModifierUserId = userId;
            _hotelReservationService.Update(hotelReservationObj);
            SaveChanges();
            return hotelReservationDto;

        }

        public PagedResultsDto GetAllHotelReservations(int page, int pageSize, int tenantId)
        {
            return _hotelReservationService.GetAllHotelReservations(page, pageSize, tenantId);
        }

    }
}
