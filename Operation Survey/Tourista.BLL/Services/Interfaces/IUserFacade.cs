using System;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IUserFacade
    {
        UserDto ValidateUser(string email, string password);
        UserDto GetUser(long userId, int tenantId);
        UserDto GetUser(long userId);
        UserDto GetUserByAccountId(Guid userAccountId);
        UserDto EditUserInfo(UserDto userDto, int userId, int tenantId);
        UserDto RegisterUser(UserDto userDto, int userId, int tenantId);
        UserDto RegisterClient(UserDto userDto, int userId, int tenantId);
        //void AddNewGlobalUser(AdminDto adminDto);
        //void UpdateGlobalUser(AdminDto adminDto);
        //void UpdateAdminPackage(AdminDto adminDto);
        //UserConsumed GetMaxAndConsumedUsers(long tenantId);
    }
}
