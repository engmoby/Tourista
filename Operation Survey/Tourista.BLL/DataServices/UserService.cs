using System;
using System.Collections.Generic;
using System.Linq;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using AutoMapper;

namespace Tourista.BLL.DataServices
{
    public class UserService : Service<User>, IUserService
    {
        public UserService(IRepositoryAsync<User> repository) : base(repository)
        {
            _repository = repository;
        }
        public User ValidateUser(string email, string password)
        {
            return _repository.Query(u => u.Email.ToLower() == email.ToLower() && u.Password == password && !u.IsDeleted   ).Select().FirstOrDefault();

        }
        public User CheckUserIsDeleted(string email, string password)
        {
            return _repository.Query(u => u.Email.ToLower() == email.ToLower() && u.Password == password).Select().FirstOrDefault();
        }
        public bool CheckEmailDuplicated(string email, int tenantId)
        {
            return _repository.Queryable().Any(u => u.Email.ToLower() == email.ToLower() && !u.IsDeleted);
        }
        public User GetUserByEmail(string email, int tenantId)
        {
            return _repository.Query(u => u.Email.ToLower() == email.ToLower() && !u.IsDeleted).Select().FirstOrDefault();
        }
        public bool CheckPhoneDuplicated(string phone, int tenantId)
        {
            return _repository.Queryable().Any(u => u.Phone == phone.ToLower() && !u.IsDeleted);
        }
        public PagedResultsDto GetAllSystemUsers(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x =>   x.IsSystemUser && (x.TenantId == tenantId) ).OrderBy(x => x.UserId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Count(); //_repository.Query(x => !x.IsDeleted).Select().Count(x => !x.IsDeleted);
            var modelReturn = query.OrderBy(x => x.UserId).Skip((page - 1) * pageSize).Take(pageSize).ToList();
             
            results.Data = Mapper.Map<List<User>, List<UserDto>>(modelReturn);  
            return results;
        }
        public PagedResultsDto GetAllUsers(int page, int pageSize, int tenantId)
        {
            var query = Queryable().Where(x => x.IsActive && !x.IsSystemUser && (x.TenantId == tenantId)).OrderBy(x => x.UserId);
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = query.Count(); //_repository.Query(x => !x.IsDeleted).Select().Count(x => !x.IsDeleted);
            var modelReturn = query.OrderBy(x => x.UserId).Skip((page - 1) * pageSize).Take(pageSize).ToList(); 
            results.Data = Mapper.Map<List<User>, List<UserDto>>(modelReturn);
            return results;
        }
        public User GetAdminByAccountId(Guid userAccountId)
        {
            return _repository.Query(x => x.UserAccountId == userAccountId).Select().FirstOrDefault();
        }
    }
}