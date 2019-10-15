﻿using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace Tourista.BLL.DataServices
{
    public class TypeService : Service<Type>, ITypeService
    {
        public TypeService(IRepositoryAsync<Type> repository) : base(repository)
        {
            _repository = repository;
        }
        
        public PagedResultsDto GetAllTypes(int page, int pageSize, int tenantId)
        { 
            var query = Queryable().Where(x => !x.IsDeleted && (x.TenantId == tenantId || x.TenantId == null)).OrderBy(x => x.TypeId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Select(x => x).Count();
            // results.TotalCount = _repository.Query(x => !x.IsDeleted).Select().Count(x => !x.IsDeleted);
            var modelReturn =  query.OrderBy(x => x.TypeId).Skip((page - 1) * pageSize).Take(pageSize).ToList() ;
            results.Data = Mapper.Map<List<Type>, List<TypeDto>>(modelReturn);

            //var products = _repository.Query(x => !x.IsDeleted).Include(p => p.TypeTranslations).Select().OrderBy(x => x.TypeId).ToList();
            //results.Data = Mapper.Map<List<Type>, List<TypeDto>>(products);
            return results;
        }

    }
}