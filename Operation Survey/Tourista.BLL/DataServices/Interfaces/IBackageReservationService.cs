﻿using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IBackageReservationService : IService<BackageReservation>
    {
         PagedResultsDto GetAllBackageReservations(int page, int pageSize, int tenantId);
    }
}
