using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using Repository.Pattern.UnitOfWork;
using Tourista.Common;
using Tourista.Common.CustomException;
using Tourista.DAL.Entities.Model;

namespace Tourista.BLL.Services
{
    public class CareerFormFacade : BaseFacade, ICareerFormFacade
    {
        private readonly ICareerFormService _CareerFormService;  


        public CareerFormFacade(ICareerFormService CareerFormService, IUnitOfWorkAsync unitOfWork  ) : base(unitOfWork)
        {
            _CareerFormService = CareerFormService;  
        }

        public CareerFormFacade(ICareerFormService careerFormService )
        {
            _CareerFormService = careerFormService;  
        }

        public CareerFormDto GetCareerForm(long careerFormId, int tenantId)
        {
            return Mapper.Map<CareerFormDto>(_CareerFormService.Query(x => x.CareerFormId == careerFormId && x.TenantId == tenantId).Select().FirstOrDefault());
        }

        public CareerFormDto CreateCareerForm(CareerFormDto careerFormDto, int userId, int tenantId)
        {
            if (GetCareerForm(careerFormDto.CareerFormId, tenantId) != null)
            {
                return EditCareerForm(careerFormDto, userId, tenantId);
            }
            ValidateCareerForm(careerFormDto, tenantId);
            var careerFormObj = Mapper.Map<CareerForm>(careerFormDto); 
            careerFormObj.FullName = careerFormDto.FullName;
            careerFormObj.Email = careerFormDto.Email; 
            careerFormObj.PhoneNo = careerFormDto.PhoneNo; 
            careerFormObj.Message = careerFormDto.Message;
            careerFormObj.CareerId = careerFormDto.CareerId;
            careerFormObj.IsDeleted = careerFormDto.IsDeleted;
            careerFormObj.CreationTime = Strings.CurrentDateTime;
            careerFormObj.CreatorUserId = userId;
            careerFormObj.TenantId = tenantId; 
            _CareerFormService.Insert(careerFormObj);
            SaveChanges();
            return careerFormDto;
        }

        public CareerFormDto EditCareerForm(CareerFormDto careerFormDto, int userId, int tenantId)
        { 
            var careerFormObj = _CareerFormService.Query(x => x.CareerFormId == careerFormDto.CareerFormId && x.TenantId == tenantId).Select().FirstOrDefault();
            if (careerFormObj == null) throw new NotFoundException(ErrorCodes.ProductNotFound);
            ValidateCareerForm(careerFormDto, tenantId);

            careerFormObj.FullName = careerFormDto.FullName;
            careerFormObj.Email = careerFormDto.Email;
            careerFormObj.PhoneNo = careerFormDto.PhoneNo;
            careerFormObj.Message = careerFormDto.Message;
            careerFormObj.CareerId = careerFormDto.CareerId;
            careerFormObj.Seen = careerFormDto.Seen; 
            careerFormObj.SeenBy = careerFormDto.SeenBy; 
            careerFormObj.SeenDate = careerFormDto.SeenDate;
            careerFormObj.IsDeleted = careerFormDto.IsDeleted;
            _CareerFormService.Update(careerFormObj);
            SaveChanges();
            return careerFormDto;

        }

        public PagedResultsDto GetAllCareerForms(int page, int pageSize, int tenantId)
        {
            return _CareerFormService.GetAllCareerForms(page, pageSize, tenantId);
        }

     
        private void ValidateCareerForm(CareerFormDto CareerFormDto, long tenantId)
        {
            
        }
    }
}
