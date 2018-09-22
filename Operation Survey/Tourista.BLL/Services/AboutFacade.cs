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
    public class AboutFacade : BaseFacade, IAboutFacade
    {
        private readonly IAboutService _AboutService;
        private readonly IAboutTranslationService _typeTranslationService; 


        public AboutFacade(IAboutService AboutService, IUnitOfWorkAsync unitOfWork, IAboutTranslationService typeTranslationService) : base(unitOfWork)
        {
            _AboutService = AboutService;
            _typeTranslationService = typeTranslationService; 
        }

        public AboutFacade(IAboutService AboutService, IAboutTranslationService typeTranslationService)
        {
            _AboutService = AboutService;
            _typeTranslationService = typeTranslationService; 
        }

        public AboutDto GetAbout(long AboutId, int tenantId)
        {
            return Mapper.Map<AboutDto>(_AboutService.Query(x => x.AboutId == AboutId && x.TenantId == tenantId).Select().FirstOrDefault());
        }
 
        public AboutDto EditAbout(AboutDto AboutDto, int userId, int tenantId)
        { 
            var AboutObj = _AboutService.Query(x => x.AboutId == AboutDto.AboutId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (AboutObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            foreach (var AboutName in AboutDto.DescriptionDictionary)
            {
                var AboutTranslation = AboutObj.AboutTranslations.FirstOrDefault(x => x.Language.ToLower() == AboutName.Key.ToLower() 
                && x.AboutId == AboutDto.AboutId);
                if (AboutTranslation == null)
                {
                    AboutObj.AboutTranslations.Add(new AboutTranslation
                    {
                        Description= AboutName.Value,
                        Language = AboutName.Key
                    });
                }
                else
                    AboutTranslation.Description = AboutName.Value;
            }

            AboutObj.LastModificationTime = Strings.CurrentDateTime;
            AboutObj.LastModifierUserId = userId;
            AboutObj.VideoUrl = AboutDto.VideoUrl; 
            _AboutService.Update(AboutObj);
            SaveChanges();
            return AboutDto;

        }

        public PagedResultsDto GetAllAbouts(int page, int pageSize, int tenantId)
        {
            return _AboutService.GetAllAbouts(page, pageSize, tenantId);
        }

      
    }
}
