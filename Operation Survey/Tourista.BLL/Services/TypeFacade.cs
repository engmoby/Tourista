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
    public class TypeFacade : BaseFacade, ITypeFacade
    {
        private readonly ITypeService _TypeService;
        private readonly ITypeTranslationService _typeTranslationService; 


        public TypeFacade(ITypeService TypeService, IUnitOfWorkAsync unitOfWork, ITypeTranslationService typeTranslationService) : base(unitOfWork)
        {
            _TypeService = TypeService;
            _typeTranslationService = typeTranslationService; 
        }

        public TypeFacade(ITypeService TypeService, ITypeTranslationService typeTranslationService)
        {
            _TypeService = TypeService;
            _typeTranslationService = typeTranslationService; 
        }

        public TypeDto GetType(long TypeId, int tenantId)
        {
            return Mapper.Map<TypeDto>(_TypeService.Query(x => x.TypeId == TypeId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public TypeDto CreateType(TypeDto TypeDto, int userId, int tenantId)
        {
            if (GetType(TypeDto.TypeId, tenantId) != null)
            {
                return EditType(TypeDto, userId, tenantId);
            }
            ValidateType(TypeDto, tenantId);
            var TypeObj = Mapper.Map<Type>(TypeDto);
            foreach (var TypeName in TypeDto.TitleDictionary)
            {
                TypeObj.TypeTranslations.Add(new TypeTranslation
                {
                    Title = TypeName.Value,
                    Language = TypeName.Key, 
                });
            }

            TypeObj.CreationTime = Strings.CurrentDateTime;
            TypeObj.CreatorUserId = userId;
            TypeObj.TenantId = tenantId;
            _typeTranslationService.InsertRange(TypeObj.TypeTranslations);
            _TypeService.Insert(TypeObj);
            SaveChanges();
            return TypeDto;
        }

        public TypeDto EditType(TypeDto TypeDto, int userId, int tenantId)
        { 
            var TypeObj = _TypeService.Query(x => x.TypeId == TypeDto.TypeId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (TypeObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateType(TypeDto, tenantId);
            foreach (var TypeName in TypeDto.TitleDictionary)
            {
                var TypeTranslation = TypeObj.TypeTranslations.FirstOrDefault(x => x.Language.ToLower() == TypeName.Key.ToLower() 
                && x.TypeId == TypeDto.TypeId);
                if (TypeTranslation == null)
                {
                    TypeObj.TypeTranslations.Add(new TypeTranslation
                    {
                        Title = TypeName.Value,
                        Language = TypeName.Key
                    });
                }
                else
                    TypeTranslation.Title = TypeName.Value;
            }

            TypeObj.LastModificationTime = Strings.CurrentDateTime;
            TypeObj.LastModifierUserId = userId;
            TypeObj.IsDeleted = TypeDto.IsDeleted; 
            _TypeService.Update(TypeObj);
            SaveChanges();
            return TypeDto;

        }

        public PagedResultsDto GetAllTypes(int page, int pageSize, int tenantId)
        {
            return _TypeService.GetAllTypes(page, pageSize, tenantId);
        }

     
        private void ValidateType(TypeDto TypeDto, long tenantId)
        {
            foreach (var name in TypeDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_typeTranslationService.CheckNameExist(name.Value, name.Key, TypeDto.TypeId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
