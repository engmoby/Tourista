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
    public class NewsService : Service<News>, INewsService
    {
        public NewsService(IRepositoryAsync<News> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetAllNewss(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => x.TenantId == tenantId).OrderBy(x => x.NewsId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            // results.TotalCount = _repository.Query(x => !x.IsDeleted).Select().Count(x => !x.IsDeleted);
            var modelReturn = query.OrderBy(x => x.NewsId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<News>, List<NewsDto>>(modelReturn);

            //var products = _repository.Query(x => !x.IsDeleted).Include(p => p.NewsTranslations).Select().OrderBy(x => x.NewsId).ToList();
            //results.Data = Mapper.Map<List<News>, List<NewsDto>>(products);
            return results;
        }

        public PagedResultsDto GetAllOnlineNewss(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => !x.IsDeleted && (x.TenantId == tenantId)).OrderBy(x => x.NewsId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.NewsId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<News>, List<NewsDto>>(modelReturn);
            return results;
        }

    }
}