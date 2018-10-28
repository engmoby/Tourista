using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Tourista.API.Models;

namespace TouristaFrontEnd.Controllers
{
    public class NewsController : Controller
    {
        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public NewsController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        // GET: News
        public async  Task<ActionResult> Index()
        {
            var vmlist = new List<NewsModel>();
            string general = url + "News/GetAllOnlineNews";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<NewsModel>>(responseData);
            }

            return View(vmlist);
        }

        // GET: News/Details/5
        public async Task<ActionResult> Details(int id = 0)
        {
            var newsModel = new NewsModel();
            var general = url + "News/GetNewsById?newsId=" + id;
            var responseMessage = await _client.GetAsync(general);
            if (!responseMessage.IsSuccessStatusCode) return View(newsModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            newsModel = JsonConvert.DeserializeObject<NewsModel>(responseData);
            return View(newsModel);
        }

        // GET: News/RelatedNewsById/5
        public ActionResult  RelatedNewsById(int newsId = 0)
        {
            var newsModel = new List<NewsModel>();
            var general = url + "News/GetAllOnlineRelatedNewsById?newsId=" + newsId;
            var responseMessage =   _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(newsModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            newsModel = JsonConvert.DeserializeObject<List<NewsModel>>(responseData);
            return View(newsModel);
        }

        // GET: News/RelatedNewsById/5
        public ActionResult RandomRelated(int newsId = 0)
        {
            var newsModel = new List<NewsModel>();
            var general = url + "News/GetAllOnlineRandomRelatedNews";
            var responseMessage = _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(newsModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            newsModel = JsonConvert.DeserializeObject<List<NewsModel>>(responseData);
            return View(newsModel);
        }
    }
}
