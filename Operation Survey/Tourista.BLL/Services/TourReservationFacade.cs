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
    public class TourReservationFacade : BaseFacade, ITourReservationFacade
    {
        private readonly ITourReservationService _TourReservationService;

        public TourReservationFacade(ITourReservationService TourReservationService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _TourReservationService = TourReservationService;
        }

        public TourReservationFacade(ITourReservationService TourReservationService)
        {
            _TourReservationService = TourReservationService;
        }

        public TourReservationDto GetTourReservation(long TourReservationId, int tenantId)
        {
            return Mapper.Map<TourReservationDto>(_TourReservationService.Query(x => x.TourReservationId == TourReservationId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public TourReservationDto CreateTourReservation(TourReservationDto TourReservationDto, int userId, int tenantId)
        {
            long ticks = DateTime.Now.Ticks;
            if (GetTourReservation(TourReservationDto.TourReservationId, tenantId) != null)
            {
                return EditTourReservation(TourReservationDto, userId, tenantId);
            }

            var TourReservationObj = Mapper.Map<TourReservation>(TourReservationDto);
            TourReservationObj.TourId = TourReservationDto.TourId;
            TourReservationObj.TickectNo = ticks.ToString();
            TourReservationObj.Note = TourReservationDto.Note;
            TourReservationObj.Address= TourReservationDto.Address;
             TourReservationObj.UserId = TourReservationDto.UserId; 
            TourReservationObj.Status = (int)Enums.Status.New;

            TourReservationObj.CreationTime = Strings.CurrentDateTime;
            TourReservationObj.CreatorUserId = TourReservationDto.UserId;
            TourReservationObj.TenantId = tenantId;
            _TourReservationService.Insert(TourReservationObj);

            SaveChanges();
            TourReservationDto.TickectNo = TourReservationObj.TickectNo;
            return TourReservationDto;
        }

        public TourReservationDto EditTourReservation(TourReservationDto TourReservationDto, int userId, int tenantId)
        {
            var TourReservationObj = _TourReservationService.Query(x => x.TourReservationId == TourReservationDto.TourReservationId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (TourReservationObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);

            TourReservationObj.SeenUserId = userId;
            TourReservationObj.Status = (int)TourReservationDto.Status;
 

            TourReservationObj.LastModificationTime = Strings.CurrentDateTime;
            TourReservationObj.LastModifierUserId = userId;
            _TourReservationService.Update(TourReservationObj);
            SaveChanges();
            return TourReservationDto;

        }

        public PagedResultsDto GetAllTourReservations(int page, int pageSize, int tenantId)
        {
            return _TourReservationService.GetAllTourReservations(page, pageSize, tenantId);
        }

    }
}
