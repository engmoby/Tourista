using System.Collections.Generic;
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
    public class NewsFacade : BaseFacade, INewsFacade
    {
        private readonly INewsService _newsService;
        private readonly INewsTranslationService _typeTranslationService;
        private IManageStorage _manageStorage;


        public NewsFacade(INewsService newsService, IUnitOfWorkAsync unitOfWork, INewsTranslationService typeTranslationService, IManageStorage manageStorage) : base(unitOfWork)
        {
            _newsService = newsService;
            _typeTranslationService = typeTranslationService;
            _manageStorage = manageStorage;
        }

        public NewsFacade(INewsService newsService, INewsTranslationService typeTranslationService, IManageStorage manageStorage)
        {
            _newsService = newsService;
            _typeTranslationService = typeTranslationService;
            _manageStorage = manageStorage;
        }

        public NewsDto GetNews(long newsId, int tenantId)
        {
            return Mapper.Map<NewsDto>(_newsService.Query(x => x.NewsId == newsId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public NewsDto CreateNews(NewsDto newsDto, int userId, int tenantId, MemoryStream file, string path)
        {
            if (GetNews(newsDto.NewsId, tenantId) != null)
            {
                return EditNews(newsDto, userId, tenantId, file, path);
            }
            ValidateNews(newsDto, tenantId);
            var newsObj = Mapper.Map<News>(newsDto);
            foreach (var newsName in newsDto.TitleDictionary)
            {
                newsObj.NewsTranslations.Add(new NewsTranslation
                {
                    Title = newsName.Value,
                    Description = newsDto.DescriptionDictionary[newsName.Key],
                    Language = newsName.Key,
                });
            }

            newsObj.CreationTime = Strings.CurrentDateTime;
            newsObj.CreatorUserId = userId;
            newsObj.TenantId = tenantId;
            _typeTranslationService.InsertRange(newsObj.NewsTranslations);
            _newsService.Insert(newsObj);
            SaveChanges();
            _manageStorage.UploadImage(path + "\\" + "News-" + newsObj.NewsId, file, newsObj.NewsId.ToString());
            return newsDto;
        }

        public NewsDto EditNews(NewsDto newsDto, int userId, int tenantId, MemoryStream file, string path)
        {
            var newsObj = _newsService.Query(x => x.NewsId == newsDto.NewsId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (newsObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateNews(newsDto, tenantId);
            foreach (var newsName in newsDto.TitleDictionary)
            {
                var newsTranslation = newsObj.NewsTranslations.FirstOrDefault(x => x.Language.ToLower() == newsName.Key.ToLower()
                && x.NewsId == newsDto.NewsId);
                if (newsTranslation == null)
                {
                    newsObj.NewsTranslations.Add(new NewsTranslation
                    {
                        Title = newsName.Value,
                        Description = newsDto.DescriptionDictionary[newsName.Key],
                        Language = newsName.Key
                    });
                }
                else
                {
                    newsTranslation.Title = newsName.Value;
                    newsTranslation.Description = newsDto.DescriptionDictionary[newsName.Key];
                }

            }

            newsObj.LastModificationTime = Strings.CurrentDateTime;
            newsObj.LastModifierUserId = userId;
            newsObj.IsDeleted = newsDto.IsDeleted;
            _newsService.Update(newsObj);
            SaveChanges();
            if (file != null)
                _manageStorage.UploadImage(path + "\\" + "News-" + newsObj.NewsId, file, newsObj.NewsId.ToString());
            return newsDto;

        }

        public PagedResultsDto GetAllNewss(int page, int pageSize, int tenantId)
        {
            return _newsService.GetAllNewss(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineNewss(int page, int pageSize, int tenantId)
        {
            return _newsService.GetAllOnlineNewss(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineRandomRelatedNews(int page, int pageSize, int tenantId)
        {
            return _newsService.GetAllOnlineRandomRelatedNews(page, pageSize, tenantId);
        }
        public PagedResultsDto GetAllOnlineRelatedNewsById(long newsId, int page, int pageSize, int tenantId)
        {
            return _newsService.GetAllOnlineRelatedNewsById(newsId,page, pageSize, tenantId);
        }
        private void ValidateNews(NewsDto NewsDto, long tenantId)
        {
            foreach (var name in NewsDto.TitleDictionary)
            {
                if (name.Value.Length > 300)
                    throw new ValidationException(ErrorCodes.MenuNameExceedLength);

                if (_typeTranslationService.CheckNameExist(name.Value, name.Key, NewsDto.NewsId, tenantId))
                    throw new ValidationException(ErrorCodes.NameIsExist);
            }
        }
    }
}
