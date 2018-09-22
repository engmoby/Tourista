using System.IO;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.BLL.Services.ManageStorage;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class FeatureFacade : BaseFacade, IFeatureFacade
    {
        private readonly IFeatureService _featureService;
        private readonly IFeatureTranslationService _typeTranslationService;
        private readonly IManageStorage _manageStorage;


        public FeatureFacade(IFeatureService FeatureService, IUnitOfWorkAsync unitOfWork, IFeatureTranslationService typeTranslationService, IManageStorage manageStorage) : base(unitOfWork)
        {
            _featureService = FeatureService;
            _typeTranslationService = typeTranslationService;
            _manageStorage = manageStorage;
        }

        public FeatureFacade(IFeatureService FeatureService, IFeatureTranslationService typeTranslationService, IManageStorage manageStorage)
        {
            _featureService = FeatureService;
            _typeTranslationService = typeTranslationService;
            _manageStorage = manageStorage;
        }

        public FeatureDto GetFeature(long FeatureId, int tenantId)
        {
            return Mapper.Map<FeatureDto>(_featureService.Query(x => x.FeatureId == FeatureId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public FeatureDto CreateFeature(FeatureDto FeatureDto, int userId, int tenantId, MemoryStream files, string path)
        {
            if (GetFeature(FeatureDto.FeatureId, tenantId) != null)
            {
                return EditFeature(FeatureDto, userId, tenantId, files, path);
            }
            ValidateFeature(FeatureDto, tenantId);
            var FeatureObj = Mapper.Map<Feature>(FeatureDto);
            foreach (var FeatureName in FeatureDto.TitleDictionary)
            {
                FeatureObj.FeaturesTranslations.Add(new FeatureTranslation
                {
                    Title = FeatureName.Value,
                    Language = FeatureName.Key,
                });
            }

            FeatureObj.CreationTime = Strings.CurrentDateTime;
            FeatureObj.CreatorUserId = userId;
            FeatureObj.TenantId = tenantId;
            _typeTranslationService.InsertRange(FeatureObj.FeaturesTranslations);
            _featureService.Insert(FeatureObj);
            SaveChanges();
            _manageStorage.UploadImage(path + "\\" + "Feature-" + FeatureObj.FeatureId, files, FeatureObj.FeatureId.ToString());
            return FeatureDto;
        }

        public FeatureDto EditFeature(FeatureDto FeatureDto, int userId, int tenantId, MemoryStream files, string path)
        {
            var FeatureObj = _featureService.Query(x => x.FeatureId == FeatureDto.FeatureId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (FeatureObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateFeature(FeatureDto, tenantId);
            foreach (var FeatureName in FeatureDto.TitleDictionary)
            {
                var FeatureTranslation = FeatureObj.FeaturesTranslations.FirstOrDefault(x => x.Language.ToLower() == FeatureName.Key.ToLower()
                && x.FeatureId == FeatureDto.FeatureId);
                if (FeatureTranslation == null)
                {
                    FeatureObj.FeaturesTranslations.Add(new FeatureTranslation
                    {
                        Title = FeatureName.Value,
                        Language = FeatureName.Key
                    });
                }
                else
                    FeatureTranslation.Title = FeatureName.Value;
            }

            FeatureObj.LastModificationTime = Strings.CurrentDateTime;
            FeatureObj.LastModifierUserId = userId;
            FeatureObj.IsDeleted = FeatureDto.IsDeleted;
            _featureService.Update(FeatureObj);
            SaveChanges();
            if (files != null)
                _manageStorage.UploadImage(path + "\\" + "Feature-" + FeatureObj.FeatureId, files, FeatureObj.FeatureId.ToString());

            return FeatureDto;

        }

        public PagedResultsDto GetAllFeatures(int page, int pageSize, int tenantId)
        {
            return _featureService.GetAllFeatures(page, pageSize, tenantId);
        }


        private void ValidateFeature(FeatureDto FeatureDto, long tenantId)
        {
            foreach (var name in FeatureDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_typeTranslationService.CheckNameExist(name.Value, name.Key, FeatureDto.FeatureId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
