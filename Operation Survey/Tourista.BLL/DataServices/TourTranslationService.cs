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
    public class TourTranslationService : Service<TourTranslation>, ITourTranslationService
    {
        public TourTranslationService(IRepositoryAsync<TourTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllTours()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Tour.IsDeleted ).Select(x => x.Tour).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Tour.IsDeleted).Select().ToList();
            var Tours = _repository.Query(x => !x.Tour.IsDeleted ).Select(x => x.Tour)
                .OrderBy(x => x.TourId).ToList();
            results.Data = Mapper.Map<List<Tour>, List<TourDto>>(Tours);
            return results;
        }
        public PagedResultsDto GetAllToursTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Tour).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Tours = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Tour)
                .OrderBy(x => x.TourId).ToList();
            results.Data = Mapper.Map<List<Tour>, List<TourDto>>(Tours, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Tour Tour in src)
                        {
                            Tour.TourTranslations = Tour.TourTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetTourTranslationByTourId(string language,long TourId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.TourId == TourId).Select(x => x.Tour).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Tours = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower() && x.TourId == TourId).Select(x => x.Tour)
                .OrderBy(x => x.TourId).ToList();
            results.Data = Mapper.Map<List<Tour>, List<TourDto>>(Tours, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Tour Tour in src)
                        {
                            Tour.TourTranslations = Tour.TourTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public TourDto TourTranslationByTourId(string language, long TourId)
        {
            var aaax = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Tours = _repository.Query(x => !x.Tour.IsDeleted && x.Language.ToLower() == language.ToLower() && x.TourId == TourId).Select(x => x.Tour)
                .OrderBy(x => x.TourId).FirstOrDefault();
            var results = Mapper.Map<Tour, TourDto>(Tours, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.TourTranslations = src.TourTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.TourId != recordId && x.Tour.TenantId == tenantId && !x.Tour.IsDeleted);
        }

    }
}