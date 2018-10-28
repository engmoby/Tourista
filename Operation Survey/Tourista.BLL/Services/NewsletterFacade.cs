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
    public class NewsletterFacade : BaseFacade, INewsletterFacade
    {
        private readonly INewsLetterService _NewsletterService;  


        public NewsletterFacade(INewsLetterService NewsletterService, IUnitOfWorkAsync unitOfWork  ) : base(unitOfWork)
        {
            _NewsletterService = NewsletterService;  
        }

        public NewsletterFacade(INewsLetterService NewsletterService )
        {
            _NewsletterService = NewsletterService;  
        }

        public NewsLetterDto GetNewsletter(long NewsletterId, int tenantId)
        {
            return Mapper.Map<NewsLetterDto>(_NewsletterService.Query(x => x.NewsLetterId == NewsletterId   ).Select().FirstOrDefault());
        }

        public NewsLetterDto CreateNewsletter(NewsLetterDto NewsLetterDto, int userId, int tenantId)
        {
            if (GetNewsletter(NewsLetterDto.NewsLetterId, tenantId) != null)
            {
                return EditNewsletter(NewsLetterDto, userId, tenantId);
            } 
            var newsletterObj = Mapper.Map<NewsLetter>(NewsLetterDto); 
            newsletterObj.SeenUserId = NewsLetterDto.SeenUserId;
            newsletterObj.Email = NewsLetterDto.Email;  
            newsletterObj.CreationTime = Strings.CurrentDateTime;
            newsletterObj.CreatorUserId = userId; 
            _NewsletterService.Insert(newsletterObj);
            SaveChanges();
            return NewsLetterDto;
        }

        public NewsLetterDto EditNewsletter(NewsLetterDto newsLetterDto, int userId, int tenantId)
        { 
            var newsletterObj = _NewsletterService.Query(x => x.NewsLetterId == newsLetterDto.NewsLetterId   ).Select().FirstOrDefault();
            if (newsletterObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
             
            newsletterObj.Email = newsLetterDto.Email; 
            //newsletterObj.SeenUser = newsLetterDto.SeenUser;  
            _NewsletterService.Update(newsletterObj);
            SaveChanges();
            return newsLetterDto;

        }

        public PagedResultsDto GetAllNewsletters(int page, int pageSize, int tenantId)
        {
            return _NewsletterService.GetAllNewsLetters(page, pageSize, tenantId);
        }
         
    }
}
