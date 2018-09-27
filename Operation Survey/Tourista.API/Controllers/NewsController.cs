
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
using Tourista.Common.CustomException;

namespace Tourista.API.Controllers
{
    public class NewsController : BaseApiController
    {
        private readonly INewsFacade _newsFacade;
        public NewsController(INewsFacade NewsFacade)
        {
            _newsFacade = NewsFacade;
        }

        [Route("api/News/GetAllNews", Name = "GetAllNews")]
        [HttpGet]
        public IHttpActionResult GetAllNews(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto NewsObj = _newsFacade.GetAllNewss(page, pagesize, TenantId);
            var data = Mapper.Map<List<NewsModel>>(NewsObj.Data);

            foreach (var news in data)
            {
                news.Image = Url.Link("NewsImage", new { NewsId = news.NewsId, imageId = news.NewsId });
            }

            return PagedResponse("GetAllNews", page, pagesize, NewsObj.TotalCount, data, NewsObj.IsParentTranslated);
        }
        [Route("api/News/GetAllOnlineNews", Name = "GetAllOnlineNews")]
        [HttpGet]
        public IHttpActionResult GetAllOnlineNews(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto NewsObj = _newsFacade.GetAllOnlineNewss(page, pagesize, TenantId);
            var data = Mapper.Map<List<NewsModel>>(NewsObj.Data);

            foreach (var news in data)
            {
                news.Image = Url.Link("NewsImage", new { NewsId = news.NewsId, imageId = news.NewsId });
            }

            return PagedResponse("GetAllOnlineNews", page, pagesize, NewsObj.TotalCount, data, NewsObj.IsParentTranslated);
        }

        [Route("api/News/{NewsId:long}/Image/{imageId:int}", Name = "NewsImage")]
        public HttpResponseMessage GetNewsImage(long newsId, int imageId, string type = "orignal")
        {
            try
            {
                string filePath = type == "orignal"
                    ? Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "News-" + newsId)
                        .FirstOrDefault(x => Path.GetFileName(x).Split('.')[0] == imageId.ToString() &&
                                             !Path.GetFileName(x).Contains("thumb"))
                    : Directory.GetFiles(HostingEnvironment.MapPath("~/Images/") + "\\" + "News-" + newsId)
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


        [Route("api/News", Name = "CreateNews")]
        [HttpPost]
        public IHttpActionResult CreateNews()
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var stream = new MemoryStream();
                HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                files.Add(stream);
            }
            var newsModel =
                new JavaScriptSerializer().Deserialize<NewsModel>(HttpContext.Current.Request.Form.Get(0));
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "News-" + newsModel.NewsId;

            var reurnNews = _newsFacade.CreateNews(Mapper.Map<NewsDto>(newsModel), UserId, TenantId, files[0],
                HostingEnvironment.MapPath("~/Images/"));

            return Ok(reurnNews);
        }

        //public IHttpActionResult CreateNews([FromBody] NewsModel NewsModel)
        //{
        //    var reurnNews = _NewsFacade.CreateNews(Mapper.Map<NewsDto>(NewsModel),UserId, TenantId);

        //    return Ok(reurnNews);
        //}


        [Route("api/News/EditNews", Name = "EditNews")]
        [HttpPost]
        public IHttpActionResult EditNews()
        {
            var httpRequest = HttpContext.Current.Request;
            List<MemoryStream> files = new List<MemoryStream>();
            if (HttpContext.Current.Request.Files.Count != 0)

                for (var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                {
                    var stream = new MemoryStream();
                    HttpContext.Current.Request.Files[i].InputStream.CopyTo(stream);
                    files.Add(stream);
                }
            var newsModel =
                new JavaScriptSerializer().Deserialize<NewsModel>(HttpContext.Current.Request.Form.Get(0));
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "news-" + newsModel.NewsId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;
            var reurnnews = _newsFacade.EditNews(Mapper.Map<NewsDto>(newsModel), UserId, TenantId, (files.Count != 0) ? files[0] : null,
                HostingEnvironment.MapPath("~/Images/"));

            return Ok(reurnnews);
        }


        [Route("api/News/GetNewsById", Name = "GetNewsById")]
        [HttpGet]
        public IHttpActionResult GetNewsById(long newsId)
        { 
            var reurnNews = _newsFacade.GetNews(newsId, TenantId);
            reurnNews.Image = String.Empty;
          
            string path = HostingEnvironment.MapPath("~/Images/") + "\\" + "News-" + reurnNews.NewsId;
            var imageCounter = Directory.Exists(path) ? Directory
                .GetFiles(path)
                .Count(x => !Path.GetFileName(x).Contains("thumb")) : -1;

            reurnNews.Image = Url.Link("NewsImage", new { NewsId = newsId, imageId = newsId });


            return Ok(reurnNews);
        }
    }

}