using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class ConatctFormFacade : BaseFacade, IConatctFormFacade
    {
        private readonly IConatctFormService _conatctFormService;


        public ConatctFormFacade(IConatctFormService conatctFormService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _conatctFormService = conatctFormService;
        }

        public ConatctFormFacade(IConatctFormService ConatctFormService)
        {
            _conatctFormService = ConatctFormService;
        }

        public ContactFormDto GetContactForm(long ConatctFormId, int tenantId)
        {
            return Mapper.Map<ContactFormDto>(_conatctFormService.Query(x => x.InqueryId == ConatctFormId).Select().FirstOrDefault());
        }

        public ContactFormDto CreateConatctForm(ContactFormDto contactFormDto, int userId, int tenantId)
        {
            //if (GetContactForm(contactFormDto.InqueryId, tenantId) != null)
            //{
            //    return EditContactForm(contactFormDto, userId, tenantId);
            //}
            var conatctFormObj = Mapper.Map<Inquery>(contactFormDto);
            conatctFormObj.UserName = contactFormDto.UserName;
            conatctFormObj.Email = contactFormDto.Email;
            conatctFormObj.Message = contactFormDto.Message;
            conatctFormObj.CreationTime = Strings.CurrentDateTime;
            conatctFormObj.CreatorUserId = userId;
            _conatctFormService.Insert(conatctFormObj);
            SaveChanges();
            return contactFormDto;
        }

        public ContactFormDto EditContactForm(ContactFormDto contactFormDto, int userId, int tenantId)
        {
            var conatctFormObj = _conatctFormService.Query(x => x.InqueryId == contactFormDto.InqueryId).Select().FirstOrDefault();
            if (conatctFormObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);


            //  conatctFormObj.Seen = contactFormDto.SeenUserId; 
            conatctFormObj.LastModifierUserId = contactFormDto.SeenUserId;
            conatctFormObj.LastModificationTime = Strings.CurrentDateTime;
            _conatctFormService.Update(conatctFormObj);
            SaveChanges();
            return contactFormDto;

        }

        public PagedResultsDto GetAllContactForms(int page, int pageSize, int tenantId)
        {
            return _conatctFormService.GetAllConatctForms(page, pageSize, tenantId);
        }

    }
}
