
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
using Tourista.BLL.DataServices.Interfaces;

namespace Tourista.API.Controllers
{
    public class BackageController : BaseApiController
    {
        private readonly IBackageFacade _BackageFacade;
        private readonly IBackageService _BackageService;
        public BackageController(IBackageFacade BackageFacade, IBackageService BackageService)
        {
            _BackageFacade = BackageFacade;
            _BackageService = BackageService;
        }

        [Route("api/Backages/GetAllBackages", Name = "GetAllBackages")]
        [HttpGet]
        public IHttpActionResult GetAllBackages(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto BackageObj = _BackageFacade.GetAllBackages(page, pagesize, TenantId);
            var data = Mapper.Map<List<BackageModel>>(BackageObj.Data);
            if (data != null)
                foreach (var item in data)
                {
                    item.ImagesURL = new List<string>();
                    string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + item.BackageId;
                    var imageCounter = Directory.Exists(path) ? Directory
                        .GetFiles(path)
                        .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
                    int id = 1;
                    while (id < imageCounter + 1)
                    {
                        item.ImagesURL.Add(Url.Link("BackageImage", new { BackageId = item.BackageId, imageId = id }));
                        id++;
                    }

                }

            return PagedResponse("GetAllBackages", page, pagesize, BackageObj.TotalCount, data, BackageObj.IsParentTranslated);
        }



        [Route("api/Backages/GetAllOnlineBackages", Name = "GetAllOnlineBackages")]
        [HttpGet]
        public IHttpActionResult GetAllOnlineBackages(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto BackageObj = _BackageFacade.GetAllOnlineBackages(page, pagesize, TenantId);
            var data = Mapper.Map<List<BackageModel>>(BackageObj.Data);
            if (data != null)
                foreach (var item in data)
                {
                    item.ImagesURL = new List<string>();
                    string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + item.BackageId;
                    var imageCounter = Directory.Exists(path) ? Directory
                        .GetFiles(path)
                        .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
                    int id = 1;
                    while (id < imageCounter + 1)
                    {
                        item.ImagesURL.Add(Url.Link("BackageImage", new { BackageId = item.BackageId, imageId = id }));
                        id++;
                    }

                }
            return Ok(data);

            return PagedResponse("GetAllOnlineBackages", page, pagesize, BackageObj.TotalCount, data, BackageObj.IsParentTranslated);
        }


        [Route("api/Backages/GetAllOnlineRelatedBackagesById", Name = "GetAllOnlineRelatedBackagesById")]
        [HttpGet]
        public IHttpActionResult GetAllOnlineRelatedBackagesById(long BackageId, int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto BackageObj = _BackageFacade.GetAllOnlineRelatedBackagesById(BackageId,page, pagesize, TenantId);
            var data = Mapper.Map<List<BackageModel>>(BackageObj.Data);
            if (data != null)
                foreach (var item in data)
                {
                    item.ImagesURL = new List<string>();
                    string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + item.BackageId;
                    var imageCounter = Directory.Exists(path) ? Directory
                        .GetFiles(path)
                        .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
                    int id = 1;
                    while (id < imageCounter + 1)
                    {
                        item.ImagesURL.Add(Url.Link("BackageImage", new { BackageId = item.BackageId, imageId = id }));
                        id++;
                    }

                }
            return Ok(data);

         }
         
        [Route("api/Backages/{BackageId:long}/Image/{imageId:int}", Name = "BackageImage")]
        public HttpResponseMessage GetBackageImage(long BackageId, int imageId, string type = "orignal")
        {
            try
            {
                string filePath = type == "orignal"
                    ? Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + BackageId)
                        .FirstOrDefault(x => Path.GetFileName(x).Split('.')[0] == imageId.ToString() &&
                                             !Path.GetFileName(x).Contains("thumb"))
                    : Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + BackageId)
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


        [Route("api/Backages", Name = "CreateBackage")]
        [HttpPost]
        public IHttpActionResult CreateBackage()
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var stream = new MemoryStream();
                HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                files.Add(stream);
            }
            var BackageModel =
                new JavaScriptSerializer().Deserialize<BackageModel>(HttpContext.Current.Request.Form.Get(0));

            var reurnBackage = _BackageFacade.CreateBackage(Mapper.Map<BackageDto>(BackageModel), UserId, TenantId, files,
                HostingEnvironment.MapPath("~/Images/"));

            return Ok(reurnBackage);
        }


        [Route("api/Backages/EditBackage", Name = "EditBackage")]
        [HttpPost]
        public IHttpActionResult EditBackage()
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var stream = new MemoryStream();
                HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                files.Add(stream);
            }
            var BackageModel =
                new JavaScriptSerializer().Deserialize<BackageModel>(HttpContext.Current.Request.Form.Get(0));
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + BackageModel.BackageId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
            var reurnBackage = _BackageFacade.EditBackage(Mapper.Map<BackageDto>(BackageModel), UserId, TenantId, files,
                HostingEnvironment.MapPath("~/Images/"), imageCounter);

            return Ok(reurnBackage);
        }


        [Route("api/Backages/GetBackageById", Name = "GetBackageById")]
        [HttpGet]
        public IHttpActionResult GetBackageById(long BackageId)
        {
            var reurnBackage = _BackageFacade.GetBackage(BackageId, TenantId);

            reurnBackage.ImagesURL = new List<string>();
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Backage-" + reurnBackage.BackageId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
            int id = 1;
            while (id < imageCounter + 1)
            {
                reurnBackage.ImagesURL.Add(Url.Link("BackageImage", new { BackageId = reurnBackage.BackageId, imageId = id }));
                id++;
            }


            return Ok(reurnBackage);
        }

        [Route("api/Backages/GetBackageByCityId", Name = "GetBackageByCityId")]
        [HttpGet]
        public IHttpActionResult GetBackageByCityId(long cityId)
        {
            var reurnBackage = _BackageService.GetBackageByCityId(cityId);
             
            return Ok(reurnBackage.Data);
        }
    }

}