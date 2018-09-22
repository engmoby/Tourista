
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
using System.Web;
using System.Web.Hosting;
using System.Web.Script.Serialization;

namespace Tourista.API.Controllers
{
    public class FeatureController : BaseApiController
    {
        private readonly IFeatureFacade _featureFacade;
        public FeatureController(IFeatureFacade featureFacade)
        {
            _featureFacade = featureFacade;
        }

        [Route("api/Features/GetAllFeatures", Name = "GetAllFeatures")]
        [HttpGet]
        public IHttpActionResult GetAllFeatures(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto featureObj = _featureFacade.GetAllFeatures(page, pagesize, TenantId);
            var data = Mapper.Map<List<FeatureModel>>(featureObj.Data);
            if (data != null)
                foreach (var item in data)
                {
                    item.Icon = string.Empty;
                    string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Feature-" + item.FeatureId;
                    var imageCounter = Directory.Exists(path) ? Directory
                        .GetFiles(path)
                        .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;

                    item.Icon = Url.Link("FeatureImage", new { FeatureId = item.FeatureId, imageId = item.FeatureId });



                }

            return PagedResponse("GetAllFeatures", page, pagesize, featureObj.TotalCount, data, featureObj.IsParentTranslated);
        }
        [Route("api/Features/{FeatureId:long}/Image/{imageId:int}", Name = "FeatureImage")]
        public HttpResponseMessage GetFeatureImage(long FeatureId, int imageId, string type = "orignal")
        {
            try
            {
                string filePath = type == "orignal"
                    ? Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "Feature-" + FeatureId)
                        .FirstOrDefault(x => Path.GetFileName(x).Split('.')[0] == imageId.ToString() &&
                                             !Path.GetFileName(x).Contains("thumb"))
                    : Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "Feature-" + FeatureId)
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


        [Route("api/Features", Name = "CreateFeature")]
        [HttpPost]
        public IHttpActionResult CreateFeature( )
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var stream = new MemoryStream();
                HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                files.Add(stream);
            }
            var FeatureModel =
                new JavaScriptSerializer().Deserialize<FeatureModel>(HttpContext.Current.Request.Form.Get(0));

            var reurnFeature = _featureFacade.CreateFeature(Mapper.Map<FeatureDto>(FeatureModel), UserId, TenantId, files[0],
                HostingEnvironment.MapPath("~/Images/"));
             
            return Ok(reurnFeature);
        }


        [Route("api/Features/EditFeature", Name = "EditFeature")]
        [HttpPost]
        public IHttpActionResult EditFeature( )
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var stream = new MemoryStream();
                HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                files.Add(stream);
            }
            var FeatureModel =
                new JavaScriptSerializer().Deserialize<FeatureModel>(HttpContext.Current.Request.Form.Get(0));
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Feature-" + FeatureModel.FeatureId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
            var reurnFeature = _featureFacade.EditFeature(Mapper.Map<FeatureDto>(FeatureModel), UserId, TenantId, (files.Count != 0) ? files[0] : null,
                HostingEnvironment.MapPath("~/Images/"));
             

            return Ok(reurnFeature);
        }


        [Route("api/Features/GetFeatureById", Name = "GetFeatureById")]
        [HttpGet]
        public IHttpActionResult GetFeatureById(long featureId)
        {
            var reurnFeature = _featureFacade.GetFeature(featureId, TenantId);
            reurnFeature.Icon = String.Empty;
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "Feature-" + reurnFeature.FeatureId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
         
                reurnFeature.Icon =Url.Link("FeatureImage", new { FeatureId = reurnFeature.FeatureId, imageId = featureId });
             
            return Ok(reurnFeature);
        }
    }

}