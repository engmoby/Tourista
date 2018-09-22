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
    public class OwnerTranslationService : Service<OwnerTranslation>, IOwnerTranslationService
    {
        public OwnerTranslationService(IRepositoryAsync<OwnerTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllOwners()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Owner.IsDeleted ).Select(x => x.Owner).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Owner.IsDeleted).Select().ToList();
            var Owners = _repository.Query(x => !x.Owner.IsDeleted ).Select(x => x.Owner)
                .OrderBy(x => x.OwnerId).ToList();
            results.Data = Mapper.Map<List<Owner>, List<OwnerDto>>(Owners);
            return results;
        }
        public PagedResultsDto GetAllOwnersTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Owner).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Owners = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Owner)
                .OrderBy(x => x.OwnerId).ToList();
            results.Data = Mapper.Map<List<Owner>, List<OwnerDto>>(Owners, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Owner Owner in src)
                        {
                            Owner.OwnerTranslations = Owner.OwnerTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetOwnerTranslationByOwnerId(string language,long OwnerId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.OwnerId == OwnerId).Select(x => x.Owner).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Owners = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower() && x.OwnerId == OwnerId).Select(x => x.Owner)
                .OrderBy(x => x.OwnerId).ToList();
            results.Data = Mapper.Map<List<Owner>, List<OwnerDto>>(Owners, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Owner Owner in src)
                        {
                            Owner.OwnerTranslations = Owner.OwnerTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public OwnerDto OwnerTranslationByOwnerId(string language, long OwnerId)
        {
            var aaax = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Owners = _repository.Query(x => !x.Owner.IsDeleted && x.Language.ToLower() == language.ToLower() && x.OwnerId == OwnerId).Select(x => x.Owner)
                .OrderBy(x => x.OwnerId).FirstOrDefault();
            var results = Mapper.Map<Owner, OwnerDto>(Owners, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.OwnerTranslations = src.OwnerTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.OwnerId != recordId && x.Owner.TenantId == tenantId && !x.Owner.IsDeleted);
        }

    }
}