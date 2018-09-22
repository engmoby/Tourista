using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class CareerFacade : BaseFacade, ICareerFacade
    {
        private readonly ICareerService _careerService;  


        public CareerFacade(ICareerService careerService, IUnitOfWorkAsync unitOfWork  ) : base(unitOfWork)
        {
            _careerService = careerService;  
        }

        public CareerFacade(ICareerService careerService )
        {
            _careerService = careerService;  
        }

        public CareerDto GetCareer(long careerId, int tenantId)
        {
            return Mapper.Map<CareerDto>(_careerService.Query(x => x.CareerId == careerId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public CareerDto CreateCareer(CareerDto careerDto, int userId, int tenantId)
        {
            if (GetCareer(careerDto.CareerId, tenantId) != null)
            {
                return EditCareer(careerDto, userId, tenantId);
            }
            ValidateCareer(careerDto, tenantId);
            var careerObj = Mapper.Map<Career>(careerDto); 
            careerObj.Title = careerDto.Title;
            careerObj.Description = careerDto.Description; 
            careerObj.IsDeleted = careerDto.IsDeleted;
            careerObj.CreationTime = Strings.CurrentDateTime;
            careerObj.CreatorUserId = userId;
            careerObj.TenantId = tenantId; 
            _careerService.Insert(careerObj);
            SaveChanges();
            return careerDto;
        }

        public CareerDto EditCareer(CareerDto careerDto, int userId, int tenantId)
        { 
            var careerObj = _careerService.Query(x => x.CareerId == careerDto.CareerId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (careerObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateCareer(careerDto, tenantId);

            careerObj.Title = careerDto.Title;
            careerObj.Description = careerDto.Description; 
            careerObj.IsDeleted = careerDto.IsDeleted; 
            _careerService.Update(careerObj);
            SaveChanges();
            return careerDto;

        }

        public PagedResultsDto GetAllCareers(int page, int pageSize, int tenantId)
        {
            return _careerService.GetAllCareers(page, pageSize, tenantId);
        }

     
        private void ValidateCareer(CareerDto careerDto, long tenantId)
        {
            
        }
    }
}
