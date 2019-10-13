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
    public class BackageReservationFacade : BaseFacade, IBackageReservationFacade
    {
        private readonly IBackageReservationService _backageReservationService;

        public BackageReservationFacade(IBackageReservationService backageReservationService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _backageReservationService = backageReservationService;
        }

        public BackageReservationFacade(IBackageReservationService backageReservationService)
        {
            _backageReservationService = backageReservationService;
        }

        public BackageReservationDto GetBackageReservation(long backageReservationId, int tenantId)
        {
            return Mapper.Map<BackageReservationDto>(_backageReservationService.Query(x => x.BackageReservationId == backageReservationId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public BackageReservationDto CreateBackageReservation(BackageReservationDto backageReservationDto, int userId, int tenantId)
        {
            long ticks = DateTime.Now.Ticks;
            if (GetBackageReservation(backageReservationDto.BackageReservationId, tenantId) != null)
            {
                return EditBackageReservation(backageReservationDto, userId, tenantId);
            }

            var backageReservationObj = Mapper.Map<BackageReservation>(backageReservationDto);
            backageReservationObj.BackageId = backageReservationDto.BackageId;
            backageReservationObj.TickectNo = ticks.ToString();
            backageReservationObj.CheckIn = backageReservationDto.CheckIn;
            backageReservationObj.CheckOut = backageReservationDto.CheckOut;
            backageReservationObj.Adult = backageReservationDto.Adult;
            backageReservationObj.Child = backageReservationDto.Child;
            backageReservationObj.UserId = backageReservationDto.UserId;
            backageReservationObj.RoomCount = backageReservationDto.RoomCount;
            backageReservationObj.Status = (int)Enums.Status.New;

            backageReservationObj.CreationTime = Strings.CurrentDateTime;
            backageReservationObj.CreatorUserId = backageReservationDto.UserId;
            backageReservationObj.TenantId = tenantId;
            _backageReservationService.Insert(backageReservationObj);

            SaveChanges();
            backageReservationDto.TickectNo = backageReservationObj.TickectNo;
            return backageReservationDto;
        }

        public BackageReservationDto EditBackageReservation(BackageReservationDto backageReservationDto, int userId, int tenantId)
        {
            var backageReservationObj = _backageReservationService.Query(x => x.BackageReservationId == backageReservationDto.BackageReservationId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (backageReservationObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);

            backageReservationObj.SeenUserId = userId;
            backageReservationObj.Status = (int)backageReservationDto.Status;
            backageReservationObj.RoomCount = backageReservationDto.RoomCount;
            backageReservationObj.Adult = backageReservationDto.Adult;
            backageReservationObj.Child = backageReservationDto.Child;

            backageReservationObj.LastModificationTime = Strings.CurrentDateTime;
            backageReservationObj.LastModifierUserId = userId;
            _backageReservationService.Update(backageReservationObj);
            SaveChanges();
            return backageReservationDto;

        }

        public PagedResultsDto GetAllBackageReservations(int page, int pageSize, int tenantId)
        {
            return _backageReservationService.GetAllBackageReservations(page, pageSize, tenantId);
        }

    }
}
