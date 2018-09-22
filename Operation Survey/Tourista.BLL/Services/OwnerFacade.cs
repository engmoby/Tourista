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
    public class OwnerFacade : BaseFacade, IOwnerFacade
    {
        private readonly IOwnerService _OwnerService;
        private readonly IOwnerTranslationService _typeTranslationService; 


        public OwnerFacade(IOwnerService OwnerService, IUnitOfWorkAsync unitOfWork, IOwnerTranslationService typeTranslationService ) : base(unitOfWork)
        {
            _OwnerService = OwnerService;
            _typeTranslationService = typeTranslationService; 
        }

        public OwnerFacade(IOwnerService OwnerService, IOwnerTranslationService typeTranslationService )
        {
            _OwnerService = OwnerService;
            _typeTranslationService = typeTranslationService; 
        }

        public OwnerDto GetOwner(long ownerId, int tenantId)
        {
            return Mapper.Map<OwnerDto>(_OwnerService.Query(x => x.OwnerId == ownerId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public OwnerDto CreateOwner(OwnerDto ownerDto, int userId, int tenantId)
        {
            if (GetOwner(ownerDto.OwnerId, tenantId) != null)
            {
                return EditOwner(ownerDto, userId, tenantId);
            }
            ValidateOwner(ownerDto, tenantId);
            var ownerObj = Mapper.Map<Owner>(ownerDto);
            foreach (var ownerName in ownerDto.TitleDictionary)
            {
                ownerObj.OwnerTranslations.Add(new OwnerTranslation
                {
                    Title = ownerName.Value,
                    Postion = ownerDto.PostionDictionary[ownerName.Key],
                    Description = ownerDto.DescriptionDictionary[ownerName.Key],
                    Language = ownerName.Key, 
                });
            }

            ownerObj.CreationTime = Strings.CurrentDateTime;
            ownerObj.CreatorUserId = userId;
            ownerObj.TenantId = tenantId;
            _typeTranslationService.InsertRange(ownerObj.OwnerTranslations);
            _OwnerService.Insert(ownerObj);
            SaveChanges();
            return ownerDto;
        }

        public OwnerDto EditOwner(OwnerDto ownerDto, int userId, int tenantId)
        { 
            var ownerObj = _OwnerService.Query(x => x.OwnerId == ownerDto.OwnerId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (ownerObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateOwner(ownerDto, tenantId);
            foreach (var ownerName in ownerDto.TitleDictionary)
            {
                var ownerTranslation = ownerObj.OwnerTranslations.FirstOrDefault(x => x.Language.ToLower() == ownerName.Key.ToLower() 
                && x.OwnerId == ownerDto.OwnerId);
                if (ownerTranslation == null)
                {
                    ownerObj.OwnerTranslations.Add(new OwnerTranslation
                    {
                        Title = ownerName.Value,
                        Postion = ownerDto.PostionDictionary[ownerName.Key],
                        Description = ownerDto.DescriptionDictionary[ownerName.Key],
                        Language = ownerName.Key
                    });
                }
                else
                {
                    ownerTranslation.Title = ownerName.Value;
                    ownerTranslation.Postion = ownerDto.PostionDictionary[ownerName.Key];
                    ownerTranslation.Description = ownerDto.DescriptionDictionary[ownerName.Key];
                }
            }

            ownerObj.LastModificationTime = Strings.CurrentDateTime;
            ownerObj.LastModifierUserId = userId;
            ownerObj.IsDeleted = ownerDto.IsDeleted; 
            _OwnerService.Update(ownerObj);
            SaveChanges();
            return ownerDto;

        }

        public PagedResultsDto GetAllOwners(int page, int pageSize, int tenantId)
        {
            return _OwnerService.GetAllOwners(page, pageSize, tenantId);
        }

     
        private void ValidateOwner(OwnerDto ownerDto, long tenantId)
        {
            foreach (var name in ownerDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_typeTranslationService.CheckNameExist(name.Value, name.Key, ownerDto.OwnerId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
