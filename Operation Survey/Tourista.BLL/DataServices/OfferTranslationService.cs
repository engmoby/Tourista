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
    public class OfferTranslationService : Service<OfferTranslation>, IOfferTranslationService
    {
        public OfferTranslationService(IRepositoryAsync<OfferTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllOffers()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Offer.IsDeleted ).Select(x => x.Offer).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Offer.IsDeleted).Select().ToList();
            var Offers = _repository.Query(x => !x.Offer.IsDeleted ).Select(x => x.Offer)
                .OrderBy(x => x.OfferId).ToList();
            results.Data = Mapper.Map<List<Offer>, List<OfferDto>>(Offers);
            return results;
        }
        public PagedResultsDto GetAllOffersTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Offer).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Offers = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.Offer)
                .OrderBy(x => x.OfferId).ToList();
            results.Data = Mapper.Map<List<Offer>, List<OfferDto>>(Offers, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Offer Offer in src)
                        {
                            Offer.OfferTranslations = Offer.OfferTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetOfferTranslationByOfferId(string language,long OfferId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.OfferId == OfferId).Select(x => x.Offer).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Offers = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower() && x.OfferId == OfferId).Select(x => x.Offer)
                .OrderBy(x => x.OfferId).ToList();
            results.Data = Mapper.Map<List<Offer>, List<OfferDto>>(Offers, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Offer Offer in src)
                        {
                            Offer.OfferTranslations = Offer.OfferTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public OfferDto OfferTranslationByOfferId(string language, long OfferId)
        {
            var aaax = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Offers = _repository.Query(x => !x.Offer.IsDeleted && x.Language.ToLower() == language.ToLower() && x.OfferId == OfferId).Select(x => x.Offer)
                .OrderBy(x => x.OfferId).FirstOrDefault();
            var results = Mapper.Map<Offer, OfferDto>(Offers, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.OfferTranslations = src.OfferTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.OfferId != recordId && x.Offer.TenantId == tenantId && !x.Offer.IsDeleted);
        }

    }
}