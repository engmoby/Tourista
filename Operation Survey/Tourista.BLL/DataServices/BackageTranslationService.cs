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
    public class BackageTranslationService : Service<BackageTranslation>, IBackageTranslationService
    {
        public BackageTranslationService(IRepositoryAsync<BackageTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllBackages()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Backage.IsDeleted ).Select(x => x.Backage).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Backage.IsDeleted).Select().ToList();
            var Backages = _repository.Query(x => !x.Backage.IsDeleted ).Select(x => x.Backage)
                .OrderBy(x => x.BackageId).ToList();
            results.Data = Mapper.Map<List<Backage>, List<BackageDto>>(Backages);
            return results;
        }
        public PagedResultsDto GetAllBackagesTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Backage).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Backages = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Backage)
                .OrderBy(x => x.BackageId).ToList();
            results.Data = Mapper.Map<List<Backage>, List<BackageDto>>(Backages, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Backage Backage in src)
                        {
                            Backage.BackageTranslations = Backage.BackageTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetBackageTranslationByBackageId(string language,long BackageId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.BackageId == BackageId).Select(x => x.Backage).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Backages = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower() && x.BackageId == BackageId).Select(x => x.Backage)
                .OrderBy(x => x.BackageId).ToList();
            results.Data = Mapper.Map<List<Backage>, List<BackageDto>>(Backages, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Backage Backage in src)
                        {
                            Backage.BackageTranslations = Backage.BackageTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public BackageDto BackageTranslationByBackageId(string language, long BackageId)
        {
            var aaax = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Backages = _repository.Query(x => !x.Backage.IsDeleted && x.Language.ToLower() == language.ToLower() && x.BackageId == BackageId).Select(x => x.Backage)
                .OrderBy(x => x.BackageId).FirstOrDefault();
            var results = Mapper.Map<Backage, BackageDto>(Backages, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.BackageTranslations = src.BackageTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.BackageId != recordId && x.Backage.TenantId == tenantId && !x.Backage.IsDeleted);
        }

    }
}