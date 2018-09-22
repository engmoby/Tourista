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
    public class NewsTranslationService : Service<NewsTranslation>, INewsTranslationService
    {
        public NewsTranslationService(IRepositoryAsync<NewsTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllNewss()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.News.IsDeleted ).Select(x => x.News).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.News.IsDeleted).Select().ToList();
            var Newss = _repository.Query(x => !x.News.IsDeleted ).Select(x => x.News)
                .OrderBy(x => x.NewsId).ToList();
            results.Data = Mapper.Map<List<News>, List<NewsDto>>(Newss);
            return results;
        }
        public PagedResultsDto GetAllNewssTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.News).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Newss = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower()).Select(x => x.News)
                .OrderBy(x => x.NewsId).ToList();
            results.Data = Mapper.Map<List<News>, List<NewsDto>>(Newss, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (News News in src)
                        {
                            News.NewsTranslations = News.NewsTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetNewsTranslationByNewsId(string language,long NewsId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower()  && x.NewsId == NewsId).Select(x => x.News).Count(x => !x.IsDeleted);
            var aaax = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Newss = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower() && x.NewsId == NewsId).Select(x => x.News)
                .OrderBy(x => x.NewsId).ToList();
            results.Data = Mapper.Map<List<News>, List<NewsDto>>(Newss, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (News News in src)
                        {
                            News.NewsTranslations = News.NewsTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public NewsDto NewsTranslationByNewsId(string language, long NewsId)
        {
            var aaax = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Newss = _repository.Query(x => !x.News.IsDeleted && x.Language.ToLower() == language.ToLower() && x.NewsId == NewsId).Select(x => x.News)
                .OrderBy(x => x.NewsId).FirstOrDefault();
            var results = Mapper.Map<News, NewsDto>(Newss, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.NewsTranslations = src.NewsTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
        public bool CheckNameExist(string objName, string language, long recordId, long tenantId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() && x.Title.ToLower() == objName.ToLower() &&
                          x.NewsId != recordId && x.News.TenantId == tenantId && !x.News.IsDeleted);
        }

    }
}