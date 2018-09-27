
using System;
using System.Web.Http;
using AutoMapper;
using Tourista.API.Infrastructure;
using Tourista.API.Models;
using Tourista.BLL.DTOs;
using Tourista.BLL.Services.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Hosting;
using System.Web.Script.Serialization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Tourista.API.Controllers
{
    public class HotelController : BaseApiController
    {
        private readonly IHotelFacade _hotelFacade;
        public HotelController(IHotelFacade hotelFacade)
        {
            _hotelFacade = hotelFacade;
        }

        [Route("api/Hotels/GetAllHotels", Name = "GetAllHotels")]
        [HttpGet]
        public IHttpActionResult GetAllHotels(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto hotelObj = _hotelFacade.GetAllHotels(page, pagesize, TenantId);
            var data = Mapper.Map<List<HotelModel>>(hotelObj.Data);
            if (data != null)
                foreach (var item in data)
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

            return PagedResponse("GetAllHotels", page, pagesize, hotelObj.TotalCount, data, hotelObj.IsParentTranslated);
        }



        [Route("api/Hotels/GetAllOnlineHotels", Name = "GetAllOnlineHotels")]
        [HttpGet]
        public IHttpActionResult GetAllOnlineHotels(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto hotelObj = _hotelFacade.GetAllOnlineHotels(page, pagesize, TenantId);
            var data = Mapper.Map<List<HotelModel>>(hotelObj.Data);
            if (data != null)
                foreach (var item in data)
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

            return PagedResponse("GetAllOnlineHotels", page, pagesize, hotelObj.TotalCount, data, hotelObj.IsParentTranslated);
        }



        [Route("api/Hotels/{hotelId:long}/Image/{imageId:int}", Name = "HotelImage")]
        public HttpResponseMessage GetHotelImage(long hotelId, int imageId, string type = "orignal")
        {
            try
            {
                string filePath = type == "orignal"
                    ? Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "Hotel-" + hotelId)
                        .FirstOrDefault(x => Path.GetFileName(x).Split('.')[0] == imageId.ToString() &&
                                             !Path.GetFileName(x).Contains("thumb"))
                    : Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "Hotel-" + hotelId)
                        .FirstOrDefault(x => Path.GetFileName(x).Split('.')[0] == imageId.ToString() &&
                                             Path.GetFileName(x).Contains("thumb"));


                HttpResponseMessage Response = new HttpResponseMessage(HttpStatusCode.OK);

                byte[] fileData = File.ReadAllBytes(filePath);

                Response.Content = new ByteArrayContent(fileData);
                Response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");

                return Response;
            }
            catch (Exception e)
            {
                return new HttpResponseMessage();
            }
        }


        [Route("api/Hotels", Name = "CreateHotel")]
        [HttpPost]
        public IHttpActionResult CreateHotel()
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var stream = new MemoryStream();
                HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                files.Add(stream);
            }
            var hotelModel =
                new JavaScriptSerializer().Deserialize<HotelModel>(HttpContext.Current.Request.Form.Get(0));

            var reurnHotel = _hotelFacade.CreateHotel(Mapper.Map<HotelDto>(hotelModel), UserId, TenantId, files,
                HostingEnvironment.MapPath("~/Images/"));

            return Ok(reurnHotel);
        }


        [Route("api/Hotels/EditHotel", Name = "EditHotel")]
        [HttpPost]
        public IHttpActionResult EditHotel()
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var stream = new MemoryStream();
                HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                files.Add(stream);
            }
            var hotelModel =
                new JavaScriptSerializer().Deserialize<HotelModel>(HttpContext.Current.Request.Form.Get(0));
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Hotel-" + hotelModel.HotelId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
            var reurnHotel = _hotelFacade.EditHotel(Mapper.Map<HotelDto>(hotelModel), UserId, TenantId, files,
                HostingEnvironment.MapPath("~/Images/"), imageCounter);

            return Ok(reurnHotel);
        }


        [Route("api/Hotels/GetHotelById", Name = "GetHotelById")]
        [HttpGet]
        public IHttpActionResult GetHotelById(long hotelId)
        {
            var reurnHotel = _hotelFacade.GetHotel(hotelId, TenantId);

            reurnHotel.ImagesURL = new List<string>();
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Hotel-" + reurnHotel.HotelId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
            int id = 1;
            while (id < imageCounter + 1)
            {
                reurnHotel.ImagesURL.Add(Url.Link("HotelImage", new { hotelId = reurnHotel.HotelId, imageId = id }));
                id++;
            }


            return Ok(reurnHotel);
        }
    }

}