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
    public class CurrencyFacade : BaseFacade, ICurrencyFacade
    {
        private readonly ICurrencyService _CurrencyService;
        private readonly ICurrencyTranslationService _typeTranslationService;
        private readonly IUserService _userService;


        public CurrencyFacade(ICurrencyService CurrencyService, IUnitOfWorkAsync unitOfWork, ICurrencyTranslationService typeTranslationService, IUserService userService) : base(unitOfWork)
        {
            _CurrencyService = CurrencyService;
            _typeTranslationService = typeTranslationService;
            _userService = userService;
        }

        public CurrencyFacade(ICurrencyService CurrencyService, ICurrencyTranslationService typeTranslationService, IUserService userService)
        {
            _CurrencyService = CurrencyService;
            _typeTranslationService = typeTranslationService;
            _userService = userService;
        }

        public CurrencyDto GetCurrency(long CurrencyId, int tenantId)
        {
            return Mapper.Map<CurrencyDto>(_CurrencyService.Query(x => x.CurrencyId == CurrencyId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public CurrencyDto CreateCurrency(CurrencyDto CurrencyDto, int userId, int tenantId)
        {
            if (GetCurrency(CurrencyDto.CurrencyId, tenantId) != null)
            {
                return EditCurrency(CurrencyDto, userId, tenantId);
            }
            ValidateCurrency(CurrencyDto, tenantId);
            var CurrencyObj = Mapper.Map<Currency>(CurrencyDto);
            foreach (var CurrencyName in CurrencyDto.TitleDictionary)
            {
                CurrencyObj.CurrencyTranslations.Add(new CurrencyTranslation
                {
                    Title = CurrencyName.Value,
                    Language = CurrencyName.Key, 
                });
            }

            CurrencyObj.CreationTime = Strings.CurrentDateTime;
            CurrencyObj.CreatorUserId = userId;
            CurrencyObj.TenantId = tenantId;
            _typeTranslationService.InsertRange(CurrencyObj.CurrencyTranslations);
            _CurrencyService.Insert(CurrencyObj);
            SaveChanges();
            return CurrencyDto;
        }

        public CurrencyDto EditCurrency(CurrencyDto CurrencyDto, int userId, int tenantId)
        { 
            var CurrencyObj = _CurrencyService.Query(x => x.CurrencyId == CurrencyDto.CurrencyId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (CurrencyObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateCurrency(CurrencyDto, tenantId);
            foreach (var CurrencyName in CurrencyDto.TitleDictionary)
            {
                var CurrencyTranslation = CurrencyObj.CurrencyTranslations.FirstOrDefault(x => x.Language.ToLower() == CurrencyName.Key.ToLower() 
                && x.CurrencyId == CurrencyDto.CurrencyId);
                if (CurrencyTranslation == null)
                {
                    CurrencyObj.CurrencyTranslations.Add(new CurrencyTranslation
                    {
                        Title = CurrencyName.Value,
                        Language = CurrencyName.Key
                    });
                }
                else
                    CurrencyTranslation.Title = CurrencyName.Value;
            }

            CurrencyObj.LastModificationTime = Strings.CurrentDateTime;
            CurrencyObj.LastModifierUserId = userId;
            CurrencyObj.IsDeleted = CurrencyDto.IsDeleted; 
            _CurrencyService.Update(CurrencyObj);
            SaveChanges();
            return CurrencyDto;

        }

        public PagedResultsDto GetAllCurrencys(int page, int pageSize, int tenantId)
        {
            return _CurrencyService.GetAllCurrencys(page, pageSize, tenantId);
        }

     
        private void ValidateCurrency(CurrencyDto CurrencyDto, long tenantId)
        {
            foreach (var name in CurrencyDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_typeTranslationService.CheckNameExist(name.Value, name.Key, CurrencyDto.CurrencyId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
