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
    public class OfferReservationFacade : BaseFacade, IOfferReservationFacade
    {
        private readonly IOfferReservationService _OfferReservationService;

        public OfferReservationFacade(IOfferReservationService OfferReservationService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _OfferReservationService = OfferReservationService;
        }

        public OfferReservationFacade(IOfferReservationService OfferReservationService)
        {
            _OfferReservationService = OfferReservationService;
        }

        public OfferReservationDto GetOfferReservation(long OfferReservationId, int tenantId)
        {
            return Mapper.Map<OfferReservationDto>(_OfferReservationService.Query(x => x.OfferReservationId == OfferReservationId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public OfferReservationDto CreateOfferReservation(OfferReservationDto OfferReservationDto, int userId, int tenantId)
        {
            long ticks = DateTime.Now.Ticks;
            if (GetOfferReservation(OfferReservationDto.OfferReservationId, tenantId) != null)
            {
                return EditOfferReservation(OfferReservationDto, userId, tenantId);
            }

            var OfferReservationObj = Mapper.Map<OfferReservation>(OfferReservationDto);
            OfferReservationObj.OfferId = OfferReservationDto.OfferId;
            OfferReservationObj.TickectNo = ticks.ToString();
            OfferReservationObj.CheckIn = OfferReservationDto.CheckIn;
            OfferReservationObj.CheckOut = OfferReservationDto.CheckOut;
            OfferReservationObj.Adult = OfferReservationDto.Adult;
            OfferReservationObj.Child = OfferReservationDto.Child;
            OfferReservationObj.UserId = OfferReservationDto.UserId;
            OfferReservationObj.RoomCount = OfferReservationDto.RoomCount;
            OfferReservationObj.Status = (int)Enums.Status.New;

            OfferReservationObj.CreationTime = Strings.CurrentDateTime;
            OfferReservationObj.CreatorUserId = OfferReservationDto.UserId;
            OfferReservationObj.TenantId = tenantId;
            _OfferReservationService.Insert(OfferReservationObj);

            SaveChanges();
            OfferReservationDto.TickectNo = OfferReservationObj.TickectNo;
            return OfferReservationDto;
        }

        public OfferReservationDto EditOfferReservation(OfferReservationDto OfferReservationDto, int userId, int tenantId)
        {
            var OfferReservationObj = _OfferReservationService.Query(x => x.OfferReservationId == OfferReservationDto.OfferReservationId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (OfferReservationObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);

            OfferReservationObj.SeenUserId = userId;
            OfferReservationObj.Status = (int)OfferReservationDto.Status;
            OfferReservationObj.RoomCount = OfferReservationDto.RoomCount;
            OfferReservationObj.Adult = OfferReservationDto.Adult;
            OfferReservationObj.Child = OfferReservationDto.Child;

            OfferReservationObj.LastModificationTime = Strings.CurrentDateTime;
            OfferReservationObj.LastModifierUserId = userId;
            _OfferReservationService.Update(OfferReservationObj);
            SaveChanges();
            return OfferReservationDto;

        }

        public PagedResultsDto GetAllOfferReservations(int page, int pageSize, int tenantId)
        {
            return _OfferReservationService.GetAllOfferReservations(page, pageSize, tenantId);
        }

    }
}
