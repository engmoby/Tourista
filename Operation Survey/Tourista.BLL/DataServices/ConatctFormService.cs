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
    public class ConatctFormService : Service<Inquery>, IConatctFormService
    {
        public ConatctFormService(IRepositoryAsync<Inquery> repository) : base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetAllConatctForms(int page, int pageSize, int tenantId)
        {
            var query = Queryable().OrderBy(x => x.InqueryId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            var modelReturn = query.OrderBy(x => x.InqueryId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            results.Data = Mapper.Map<List<Inquery>, List<ContactFormDto>>(modelReturn);
            return results;
        }

    }
}