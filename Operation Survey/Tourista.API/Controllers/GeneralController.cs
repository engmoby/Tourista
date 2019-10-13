
using System;
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Hosting;

namespace Tourista.API.Controllers
{
    public class GeneralController : BaseApiController
    {
        private readonly IAboutFacade _aboutFacade;
        private readonly INewsFacade _newsFacade;
        private readonly IHotelFacade _hotelFacade;
        private readonly IContactFacade _contactFacade;
        private readonly IOwnerFacade _ownerFacade;
        private readonly ICountryFacade _countryFacade;
        private readonly IBackageFacade _backageFacade;

        public GeneralController(IAboutFacade aboutFacade, INewsFacade newsFacade, IHotelFacade hotelFacade,
            IContactFacade contactFacade, IOwnerFacade ownerFacade, ICountryFacade countryFacade, IBackageFacade backageFacade)

        {
            _aboutFacade = aboutFacade;
            _newsFacade = newsFacade;
            _hotelFacade = hotelFacade;
            _contactFacade = contactFacade;
            _ownerFacade = ownerFacade;
            _countryFacade = countryFacade;
            _backageFacade = backageFacade;
        }

        [Route("api/General/GetAllGeneral", Name = "GetAllGeneral")]
        [HttpGet]
        public IHttpActionResult GetAllGeneral(int page = Page, int pagesize = PageSize)
        {
            GeneralModel generalModel = new GeneralModel();

            PagedResultsDto aboutObj = _aboutFacade.GetAllAbouts(page, pagesize, TenantId);
            var aboutModel = Mapper.Map<List<AboutModel>>(aboutObj.Data);
            generalModel.About = aboutModel;

            PagedResultsDto newsObj = _newsFacade.GetAllOnlineNewss(page, pagesize, TenantId);
            var newsModel = Mapper.Map<List<NewsModel>>(newsObj.Data);

            foreach (var news in newsModel)
            {
                news.Image = Url.Link("NewsImage", new { NewsId = news.NewsId, imageId = news.NewsId });
            }

            generalModel.News = newsModel;

            PagedResultsDto hotelObj = _hotelFacade.GetAllOnlineHotels(page, pagesize, TenantId);
            var hotelModel = Mapper.Map<List<HotelModel>>(hotelObj.Data);
            if (hotelModel != null)
                foreach (var item in hotelModel)
                {
                    item.ImagesURL = new List<string>();
                    string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Hotel-" + item.HotelId;
                    var imageCounter = Directory.Exists(path) ? Directory
                        .GetFiles(path)
                        .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
                    int id = 1;
                    while (id < imageCounter + 1)
                    {
                        item.ImagesURL.Add(Url.Link("HotelImage", new { hotelId = item.HotelId, imageId = id }));
                        id++;
                    }

                }

            generalModel.Hotel = hotelModel;

            PagedResultsDto backageObj = _backageFacade.GetAllOnlineBackages(page, pagesize, TenantId);
            var backageModel = Mapper.Map<List<BackageModel>>(backageObj.Data);
            if (backageModel != null)
                foreach (var item in backageModel)
                {
                    item.ImagesURL = new List<string>();
                    string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + item.BackageId;
                    var imageCounter = Directory.Exists(path) ? Directory
                        .GetFiles(path)
                        .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
                    int id = 1;
                    while (id < imageCounter + 1)
                    {
                        item.ImagesURL.Add(Url.Link("BackageImage", new { backageId = item.BackageId, imageId = id }));
                        id++;
                    }

                }

            generalModel.Backage = backageModel;

            PagedResultsDto ownerObj = _ownerFacade.GetAllOnlineOwners(page, pagesize, TenantId);
            var ownerModel = Mapper.Map<List<OwnerModel>>(ownerObj.Data);
            generalModel.Owner = ownerModel;


            PagedResultsDto contactObj = _contactFacade.GetAllContacts(page, pagesize, TenantId);
            var contactModel = Mapper.Map<List<ContactModel>>(contactObj.Data);
            generalModel.Contact = contactModel;


            PagedResultsDto countryObj = _countryFacade.GetAllCountrys(page, pagesize, TenantId);
            var countryModel = Mapper.Map<List<CountryModel>>(countryObj.Data);
            generalModel.Country = countryModel;

            return Ok(generalModel);
        }



    }

}