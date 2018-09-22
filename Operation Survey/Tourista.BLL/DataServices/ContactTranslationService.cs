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
    public class ContactUsTranslationService : Service<ContactUsTranslation>, IContactTranslationService
    {
        public ContactUsTranslationService(IRepositoryAsync<ContactUsTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllContacts()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query().Select(x => x.ContactUs).Count();
            var aaax = _repository.Query().Select().ToList();
            var Contacts = _repository.Query().Select(x => x.ContactUs).OrderBy(x => x.ContactUsId).ToList();
            results.Data = Mapper.Map<List<ContactUs>, List<ContactDto>>(Contacts);
            return results;
        }
        public PagedResultsDto GetAllContactsTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x =>   x.Language.ToLower() == language.ToLower()).Select(x => x.ContactUs).Count();
            var aaax = _repository.Query(x => x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Contacts = _repository.Query(x =>   x.Language.ToLower() == language.ToLower()).Select(x => x.ContactUs)
                .OrderBy(x => x.ContactUsId).ToList();
            results.Data = Mapper.Map<List<ContactUs>, List<ContactDto>>(Contacts, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (ContactUs Contact in src)
                        {
                            Contact.ContactUsTranslations = Contact.ContactUsTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetContactUsTranslationByContactId(string language,long ContactId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x =>  x.Language.ToLower() == language.ToLower()  && x.ContactUsId == ContactId)
                .Select(x => x.ContactUs).Count();
            var aaax = _repository.Query(x =>  x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Contacts = _repository.Query(x => x.Language.ToLower() == language.ToLower() && x.ContactUsId == ContactId)
                .Select(x => x.ContactUs)
                .OrderBy(x => x.ContactUsId).ToList();
            results.Data = Mapper.Map<List<ContactUs>, List<ContactDto>>(Contacts, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (ContactUs Contact in src)
                        {
                            Contact.ContactUsTranslations = Contact.ContactUsTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public ContactDto ContactUsTranslationByContactId(string language, long ContactId)
        {
            var aaax = _repository.Query(x => x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Contacts = _repository.Query(x => x.Language.ToLower() == language.ToLower() && x.ContactUsId == ContactId)
                .Select(x => x.ContactUs)
                .OrderBy(x => x.ContactUsId).FirstOrDefault();
            var results = Mapper.Map<ContactUs, ContactDto>(Contacts, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.ContactUsTranslations = src.ContactUsTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
      

    }
}