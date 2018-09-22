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
    public class FeatureTranslationService : Service<FeatureTranslation>, IFeatureTranslationService
    {
        public FeatureTranslationService(IRepositoryAsync<FeatureTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllFeatures()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Features.IsDeleted ).Select(x => x.Features).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Features.IsDeleted).Select().ToList();
            var Features = _repository.Query(x => !x.Features.IsDeleted ).Select(x => x.Features)
                .OrderBy(x => x.FeatureId).ToList();
            results.Data = Mapper.Map<List<Feature>, List<FeatureDto>>(Features);
            return results;
        }
        public PagedResultsDto GetAllFeaturesTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Features).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Features = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Features)
                .OrderBy(x => x.FeatureId).ToList();
            results.Data = Mapper.Map<List<Feature>, List<FeatureDto>>(Features, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Feature Feature in src)
                        {
                            Feature.FeaturesTranslations = Feature.FeaturesTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetFeatureTranslationByFeatureId(string language,long FeatureId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.FeatureId == FeatureId).Select(x => x.Features).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Features = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower() && x.FeatureId == FeatureId).Select(x => x.Features)
                .OrderBy(x => x.FeatureId).ToList();
            results.Data = Mapper.Map<List<Feature>, List<FeatureDto>>(Features, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Feature Feature in src)
                        {
                            Feature.FeaturesTranslations = Feature.FeaturesTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public FeatureDto FeatureTranslationByFeatureId(string language, long FeatureId)
        {
            var aaax = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Features = _repository.Query(x => !x.Features.IsDeleted && x.Language.ToLower() == language.ToLower() && x.FeatureId == FeatureId).Select(x => x.Features)
                .OrderBy(x => x.FeatureId).FirstOrDefault();
            var results = Mapper.Map<Feature, FeatureDto>(Features, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.FeaturesTranslations = src.FeaturesTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.FeatureId != recordId && x.Features.TenantId == tenantId && !x.Features.IsDeleted);
        }

    }
}