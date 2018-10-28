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
    public class NewsLetterService : Service<NewsLetter>, INewsLetterService
    {
        public NewsLetterService(IRepositoryAsync<NewsLetter> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetAllNewsLetters(int page, int pageSize, int tenantId)
        {
            var query = Queryable().OrderBy(x => x.NewsLetterId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.NewsLetterId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<NewsLetter>, List<NewsLetterDto>>(modelReturn);
            return results;
        }

    }
}