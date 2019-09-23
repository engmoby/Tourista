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
    public class TypeTranslationService : Service<TypeTranslation>, ITypeTranslationService
    {
        public TypeTranslationService(IRepositoryAsync<TypeTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllTypes()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Type.IsDeleted ).Select(x => x.Type).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Type.IsDeleted).Select().ToList();
            var Types = _repository.Query(x => !x.Type.IsDeleted ).Select(x => x.Type)
                .OrderBy(x => x.TypeId).ToList();
            results.Data = Mapper.Map<List<Type>, List<TypeDto>>(Types);
            return results;
        }
        public PagedResultsDto GetAllTypesTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Type).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Types = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Type)
                .OrderBy(x => x.TypeId).ToList();
            results.Data = Mapper.Map<List<Type>, List<TypeDto>>(Types, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Type Type in src)
                        {
                            Type.TypeTranslations = Type.TypeTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetTypeTranslationByTypeId(string language,long TypeId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.TypeId == TypeId).Select(x => x.Type).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Types = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower() && x.TypeId == TypeId).Select(x => x.Type)
                .OrderBy(x => x.TypeId).ToList();
            results.Data = Mapper.Map<List<Type>, List<TypeDto>>(Types, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Type Type in src)
                        {
                            Type.TypeTranslations = Type.TypeTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public TypeDto TypeTranslationByTypeId(string language, long TypeId)
        {
            var aaax = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Types = _repository.Query(x => !x.Type.IsDeleted && x.Language.ToLower() == language.ToLower() && x.TypeId == TypeId).Select(x => x.Type)
                .OrderBy(x => x.TypeId).FirstOrDefault();
            var results = Mapper.Map<Type, TypeDto>(Types, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.TypeTranslations = src.TypeTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.TypeId != recordId && x.Type.TenantId == tenantId && !x.Type.IsDeleted);
        }

    }
}