using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class ContactFacade : BaseFacade, IContactFacade
    {
        private readonly IContactService _ContactService;
        private readonly IContactTranslationService _typeTranslationService; 


        public ContactFacade(IContactService ContactService, IUnitOfWorkAsync unitOfWork, IContactTranslationService typeTranslationService) : base(unitOfWork)
        {
            _ContactService = ContactService;
            _typeTranslationService = typeTranslationService; 
        }

        public ContactFacade(IContactService ContactService, IContactTranslationService typeTranslationService)
        {
            _ContactService = ContactService;
            _typeTranslationService = typeTranslationService; 
        }

        public ContactDto GetContact(long ContactUsId, int tenantId)
        {
            return Mapper.Map<ContactDto>(_ContactService.Query(x => x.ContactUsId == ContactUsId && x.TenantId == tenantId).Select().FirstOrDefault());
        }
 
        public ContactDto EditContact(ContactDto ContactDto, int userId, int tenantId)
        { 
            var ContactObj = _ContactService.Query(x => x.ContactUsId == ContactDto.ContactUsId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (ContactObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            foreach (var ContactName in ContactDto.AddressDictionary)
            {
                var ContactTranslation = ContactObj.ContactUsTranslations.FirstOrDefault(x => x.Language.ToLower() == ContactName.Key.ToLower() 
                && x.ContactUsId == ContactDto.ContactUsId);
                if (ContactTranslation == null)
                {
                    ContactObj.ContactUsTranslations.Add(new ContactUsTranslation
                    {
                        Address= ContactName.Value,
                        Language = ContactName.Key
                    });
                }
                else
                    ContactTranslation.Address= ContactName.Value;
            }

            ContactObj.LastModificationTime = Strings.CurrentDateTime;
            ContactObj.LastModifierUserId = userId;
            ContactObj.Phone = ContactDto.Phone; 
            ContactObj.Phone1 = ContactDto.Phone1; 
            ContactObj.Phone2 = ContactDto.Phone2;
            ContactObj.Fax= ContactDto.Fax; 
            ContactObj.Mail = ContactDto.Mail; 
            ContactObj.Mail1 = ContactDto.Mail1; 
            ContactObj.Mail2 = ContactDto.Mail2;
            ContactObj.Facebook= ContactDto.Facebook; 
            ContactObj.Twitter= ContactDto.Twitter; 
            ContactObj.Instgram= ContactDto.Instgram; 
            ContactObj.LinkedIn = ContactDto.LinkedIn; 
            _ContactService.Update(ContactObj);
            SaveChanges();
            return ContactDto;

        }

        public PagedResultsDto GetAllContacts(int page, int pageSize, int tenantId)
        {
            return _ContactService.GetAllContacts(page, pageSize, tenantId);
        }

      
    }
}
