﻿using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Service.Pattern;

namespace Tourista.BLL.DataServices.Interfaces
{
    public interface INewsService : IService<News>
    {
         PagedResultsDto GetAllNewss(int page, int pageSize, int tenantId);
    }
}
