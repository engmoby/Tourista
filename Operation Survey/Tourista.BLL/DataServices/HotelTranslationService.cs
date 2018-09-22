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
    public class HotelTranslationService : Service<HotelTranslation>, IHotelTranslationService
    {
        public HotelTranslationService(IRepositoryAsync<HotelTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllHotels()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Hotel.IsDeleted ).Select(x => x.Hotel).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Hotel.IsDeleted).Select().ToList();
            var Hotels = _repository.Query(x => !x.Hotel.IsDeleted ).Select(x => x.Hotel)
                .OrderBy(x => x.HotelId).ToList();
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(Hotels);
            return results;
        }
        public PagedResultsDto GetAllHotelsTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Hotel).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Hotels = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Hotel)
                .OrderBy(x => x.HotelId).ToList();
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(Hotels, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Hotel Hotel in src)
                        {
                            Hotel.HotelTranslations = Hotel.HotelTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetHotelTranslationByHotelId(string language,long HotelId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.HotelId == HotelId).Select(x => x.Hotel).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Hotels = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower() && x.HotelId == HotelId).Select(x => x.Hotel)
                .OrderBy(x => x.HotelId).ToList();
            results.Data = Mapper.Map<List<Hotel>, List<HotelDto>>(Hotels, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Hotel Hotel in src)
                        {
                            Hotel.HotelTranslations = Hotel.HotelTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public HotelDto HotelTranslationByHotelId(string language, long HotelId)
        {
            var aaax = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Hotels = _repository.Query(x => !x.Hotel.IsDeleted && x.Language.ToLower() == language.ToLower() && x.HotelId == HotelId).Select(x => x.Hotel)
                .OrderBy(x => x.HotelId).FirstOrDefault();
            var results = Mapper.Map<Hotel, HotelDto>(Hotels, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.HotelTranslations = src.HotelTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.HotelId != recordId && x.Hotel.TenantId == tenantId && !x.Hotel.IsDeleted);
        }

    }
}