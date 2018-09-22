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
    public class CurrencyTranslationService : Service<CurrencyTranslation>, ICurrencyTranslationService
    {
        public CurrencyTranslationService(IRepositoryAsync<CurrencyTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllCurrencys()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Currency.IsDeleted ).Select(x => x.Currency).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Currency.IsDeleted).Select().ToList();
            var Currencys = _repository.Query(x => !x.Currency.IsDeleted ).Select(x => x.Currency)
                .OrderBy(x => x.CurrencyId).ToList();
            results.Data = Mapper.Map<List<Currency>, List<CurrencyDto>>(Currencys);
            return results;
        }
        public PagedResultsDto GetAllCurrencysTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Currency).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Currencys = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Currency)
                .OrderBy(x => x.CurrencyId).ToList();
            results.Data = Mapper.Map<List<Currency>, List<CurrencyDto>>(Currencys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Currency Currency in src)
                        {
                            Currency.CurrencyTranslations = Currency.CurrencyTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetCurrencyTranslationByCurrencyId(string language,long CurrencyId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.CurrencyId == CurrencyId).Select(x => x.Currency).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Currencys = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower() && x.CurrencyId == CurrencyId).Select(x => x.Currency)
                .OrderBy(x => x.CurrencyId).ToList();
            results.Data = Mapper.Map<List<Currency>, List<CurrencyDto>>(Currencys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Currency Currency in src)
                        {
                            Currency.CurrencyTranslations = Currency.CurrencyTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public CurrencyDto CurrencyTranslationByCurrencyId(string language, long CurrencyId)
        {
            var aaax = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Currencys = _repository.Query(x => !x.Currency.IsDeleted && x.Language.ToLower() == language.ToLower() && x.CurrencyId == CurrencyId).Select(x => x.Currency)
                .OrderBy(x => x.CurrencyId).FirstOrDefault();
            var results = Mapper.Map<Currency, CurrencyDto>(Currencys, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.CurrencyTranslations = src.CurrencyTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.CurrencyId != recordId && x.Currency.TenantId == tenantId && !x.Currency.IsDeleted);
        }

    }
}