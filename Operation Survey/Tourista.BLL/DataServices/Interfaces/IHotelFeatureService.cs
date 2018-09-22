using System.Collections.Generic;
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface IHotelFeatureService : IService<HotelFeature>
    {
        List<HotelFeatureDto> GetHotelFeatureById(long hotelId, int tenantId);
    }
}
