using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using Tourista.Common;
using Tourista.Common.CustomException;
using Repository.Pattern.UnitOfWork;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class UserFacade : BaseFacade, IUserFacade
    {
        private readonly IUserService _userService;
        public UserFacade(IUserService userService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _userService = userService;
        }

        public UserFacade(IUserService userService)
        {
            _userService = userService;
        }


        public UserDto ValidateUser(string email, string password)
        {
            string encryptedPassword = PasswordHelper.Encrypt(password);
            var user = _userService.ValidateUser(email, encryptedPassword) ?? _userService.CheckUserIsDeleted(email, encryptedPassword);
            if (user == null) throw new ValidationException(ErrorCodes.UserNotFound);
            if (!user.IsActive) throw new ValidationException(ErrorCodes.UserNotACativated);
            var userDto = Mapper.Map<UserDto>(user);
            if (user.UserType == (int)Enums.UserType.Manager)
            {
                userDto.PermissionId = new List<long>();
                userDto.PermissionId.Add(1);
                userDto.PermissionId.Add(2);
                userDto.PermissionId.Add(3);
                userDto.PermissionId.Add(4);
                userDto.PermissionId.Add(5);
                userDto.PermissionId.Add(6);
                userDto.PermissionId.Add(7);
                userDto.PermissionId.Add(8);
                userDto.PermissionId.Add(9);
                userDto.PermissionId.Add(10);
            }
            if (user.UserType == (int)Enums.UserType.Employee)
            {
                userDto.PermissionId = new List<long>();
                userDto.PermissionId.Add(1);
            }
            return userDto;
        }

        public UserDto GetUser(long userId)
        {
            return Mapper.Map<UserDto>(_userService.Find(userId));
        }

        public UserDto GetUser(long userId, int tenantId)
        {
            return Mapper.Map<UserDto>(_userService.Query(x => x.UserId == userId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public UserDto GetUserByAccountId(Guid userAccountId)
        {
            return Mapper.Map<UserDto>(_userService.Query(x => x.UserAccountId == userAccountId).Select().FirstOrDefault());
        }
        public UserDto RegisterUser(UserDto userDto, int userId, int tenantId)
        {
            if (GetUser(userDto.UserId, tenantId) != null)
            {
                return EditUser(userDto, userId, tenantId);
            }
            if (_userService.CheckEmailDuplicated(userDto.Email, tenantId))
            {
                throw new ValidationException(ErrorCodes.MailExist);
            }
            if (_userService.CheckPhoneDuplicated(userDto.Phone, tenantId))
            {
                throw new ValidationException(ErrorCodes.PhoneExist);
            }


            var userObj = Mapper.Map<User>(userDto);
            userObj.FullName = userDto.FullName;
            //userObj.UserAccountId = Guid.NewGuid(); 
            userObj.Email = userDto.Email;
            userObj.Phone = userDto.Phone;
            userObj.Password = PasswordHelper.Encrypt(userDto.Password);
            userObj.CreationTime = DateTime.Now;
            userObj.IsActive = true;
            userObj.IsDeleted = false;
            userObj.UserType = (int)userDto.UserType;
            userObj.TenantId = tenantId;
            userObj.CreationTime = Strings.CurrentDateTime;
            userObj.CreatorUserId = userId;

            _userService.Insert(userObj);
            SaveChanges();
            var userRetuenDto = Mapper.Map<UserDto>(userObj);

            return userDto;
        }

        public UserDto EditUserInfo(UserDto userDto, int userId, int tenantId)
        {
            var returnUser = EditUser(userDto, userId, tenantId);
            return returnUser;
        }
        public UserDto EditUser(UserDto userDto, int userId, int tenantId)
        {
            var userObj = _userService.Query(x => x.UserId == userDto.UserId && x.TenantId == tenantId)
                .Select().FirstOrDefault();
            userObj.FullName = userDto.FullName;
            userObj.Phone = userDto.Phone;
            userObj.Password = (userDto.Password != null) ? PasswordHelper.Encrypt(userDto.Password) : userObj.Password;
            userObj.IsActive = userDto.IsActive;
            userObj.IsDeleted = userDto.IsDeleted;
            userObj.Email = userDto.Email;
            userObj.WhatsApp = userDto.WhatsApp;
            userObj.Title = userDto.Title;
            userObj.UserType = (int)userDto.UserType;

            _userService.Update(userObj);
            SaveChanges();


            // var userRetuenDto = Mapper.Map<UserDto>(userObj);
            return userDto;
        }

        #region integration with subscription module
        //private void UpdateSubscription(Guid adminAccountGuid, Guid packageGuid, int consumed)
        //{
        //    //var admin = _userService.Find(adminId);
        //    string url = ConfigurationManager.AppSettings["subscriptionURL"];
        //    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url + "/Users/EditUserConsumer");
        //    //request.Headers.Add("X-Auth-Token:" + token);
        //    request.ContentType = "application/json";
        //    request.Method = "POST";
        //    var serializer = JsonConvert.SerializeObject(new
        //    {
        //        userConsumer = consumed,
        //        userAccountId = adminAccountGuid,
        //        backageGuid = packageGuid,
        //        //productId = admin.ProductId
        //    });
        //    //request.ContentLength = serializer.Length;
        //    using (var streamWriter = new StreamWriter(request.GetRequestStream()))
        //    {
        //        string json = serializer;

        //        streamWriter.Write(json);
        //    }
        //    using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
        //    {

        //        Stream receiveStream = response.GetResponseStream();
        //        StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
        //        var infoResponse = readStream.ReadToEnd();

        //        response.Close();
        //        receiveStream.Close();
        //        readStream.Close();
        //    }
        //}

        //public void AddNewGlobalUser(AdminDto adminDto)
        //{
        //    var admin = _userService.GetAdminByAccountId(adminDto.UserAccountId);
        //    var lastUser = _userService.Queryable().OrderByDescending(x => x.TenantId).FirstOrDefault();
        //   var tenantId = admin?.TenantId ?? (lastUser?.TenantId +1 ?? 1);
        //    if (admin == null)
        //    {
        //        User newAdmin = new User();
        //        newAdmin.Email = adminDto.UserName;
        //        newAdmin.FirstName = adminDto.Name;
        //        newAdmin.UserAccountId = adminDto.UserAccountId;
        //        newAdmin.UserRoles.Add(new UserRole {RoleId = 1});
        //        newAdmin.UserTypeId = 1;
        //        newAdmin.Password = adminDto.Password;
        //        newAdmin.IsActive = adminDto.IsActive;
        //        newAdmin.TenantId = tenantId;
        //        newAdmin.IsStatic = true;
        //        _userRoleService.InsertRange(newAdmin.UserRoles);
        //        _userService.Insert(newAdmin);
        //        admin = newAdmin;
        //    }
        //    else
        //    {
        //        admin.Email = adminDto.UserName;
        //        admin.FirstName = adminDto.Name;
        //        admin.Password = adminDto.Password;
        //        admin.IsActive = adminDto.IsActive;
        //        //admin.ProductId = adminDto.ProductId;

        //        _userService.Update(admin);
        //    }
        //    SaveChanges();
        //    var package = _packageService.Query(x => x.PackageGuid == adminDto.PackageGuid).Select().FirstOrDefault();
        //    if (package == null)
        //    {
        //        Package newPackage = new Package
        //        {
        //            End = adminDto.End,
        //            Start = adminDto.Start,
        //            MaxNumberOfUsers = adminDto.Limit,
        //            PackageGuid = adminDto.PackageGuid,
        //            TenantId = tenantId
        //        };
        //        _packageService.Insert(newPackage);
        //    }
        //    else
        //    {
        //        package.End = adminDto.End;
        //        package.Start = adminDto.Start;
        //        _packageService.Update(package);
        //    }

        //    //_userService.Update(admin);
        //    SaveChanges();
        //}

        //public void UpdateGlobalUser(AdminDto adminDto)
        //{
        //    var admin = _userService.GetAdminByAccountId(adminDto.UserAccountId);
        //    admin.Email = adminDto.UserName;
        //    admin.FirstName = adminDto.Name;
        //    admin.Password = adminDto.Password;
        //    admin.IsActive = adminDto.IsActive;

        //    _userService.Update(admin);
        //    SaveChanges();
        //}

        //public void UpdateAdminPackage(AdminDto adminDto)
        //{
        //    var admin = _userService.GetAdminByAccountId(adminDto.UserAccountId);
        //    var package = _packageService.Query(x => x.PackageGuid == adminDto.PackageGuid).Select().FirstOrDefault();
        //    if (package == null)
        //    {
        //        Package newPackage = new Package
        //        {
        //            End = adminDto.End,
        //            Start = adminDto.Start,
        //            MaxNumberOfUsers = adminDto.Limit,
        //            PackageGuid = adminDto.PackageGuid,
        //            TenantId = admin.TenantId
        //        };
        //        _packageService.Insert(newPackage);
        //    }
        //    else
        //    {
        //        package.End = adminDto.End;
        //        package.Start = adminDto.Start;
        //        _packageService.Update(package);
        //    }
        //    //admin.ProductId = adminDto.ProductId;

        //    _userService.Update(admin);
        //    SaveChanges();
        //}


        //public UserConsumed GetMaxAndConsumedUsers(long tenantId)
        //{
        //    var maxNum = _packageService.Query(x=>x.TenantId == tenantId).Select(x=>x.MaxNumberOfUsers).Sum();

        //    var consumedUsers = _userService.Query(x=>!x.IsDeleted && x.TenantId == tenantId && !x.IsStatic).Select().Count();

        //    UserConsumed MaxCon = new UserConsumed();
        //    MaxCon.MaxNumUsers = maxNum;
        //    MaxCon.ConsumedUsers = consumedUsers;


        //    return MaxCon;
        //}



        #endregion
    }
}
