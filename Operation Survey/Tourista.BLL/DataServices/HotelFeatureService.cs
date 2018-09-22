using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace Tourista.BLL.DataServices
{
    public class HotelFeatureService : Service<HotelFeature>, IHotelFeatureService
    {
        public HotelFeatureService(IRepositoryAsync<HotelFeature> repository) : base(repository)
        {
            _repository = repository;
        }

        public List<HotelFeatureDto> GetHotelFeatureById(long hotelId, int tenantId)
        {
            var hotelFeatures = _repository.Query(x => x.HotelId == hotelId && x.TenantId == tenantId).Select().ToList();

            var hotelFeatureDto = new List<HotelFeatureDto>();
            foreach (var hotel in hotelFeatures)
            {
                hotelFeatureDto.Add(new HotelFeatureDto
                {
                    FeatureId = hotel.FeatureId,
                    HotelId = hotel.HotelId,
                });
            } 
            var results = hotelFeatureDto;
            return results;
        }

    }
}