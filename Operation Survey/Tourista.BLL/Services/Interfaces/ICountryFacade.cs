using Tourista.BLL.DTOs;

namespace Tourista.BLL.Services.Interfaces
{
    public interface ICountryFacade
    { 
        CountryDto GetCountry(long userId, int tenantId); 
        CountryDto CreateCountry(CountryDto userDto, int userId, int tenantId); 
        CountryDto EditCountry(CountryDto userDto, int userId, int tenantId);
        PagedResultsDto GetAllCountrys(int page, int pageSize, int tenantId); 
    }
}
