using Tourista.BLL.DataServices.Interfaces;
using Repository.Pattern.Repositories;
using Service.Pattern;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.DataServices
{
    public class RefreshTokenService : Service<RefreshToken>, IRefreshTokenService
    {
        private readonly IRepositoryAsync<RefreshToken> _repository;

        public RefreshTokenService(IRepositoryAsync<RefreshToken> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
