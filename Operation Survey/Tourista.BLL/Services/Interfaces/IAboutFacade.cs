using System;
using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface IAboutFacade
    {
        AboutDto GetAbout(long AboutId, int tenantId);
        AboutDto EditAbout(AboutDto AboutDto, int userId, int tenantId);
        PagedResultsDto GetAllAbouts(int page, int pageSize, int tenantId);
    }
}
