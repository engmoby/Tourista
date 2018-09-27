using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Tourista.API.Models;
using TouristaFrontEnd.Helper;

namespace TouristaFrontEnd.Controllers
{
    public class HomeController : Controller
    {
        private readonly HttpClient _client;
        private string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public HomeController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public ActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> About()
        {
            var vmlist = new List<AboutModel>();
            var vm = new AboutModel();
            string general = url + "About/GetAllAbout";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;

                vmlist = JsonConvert.DeserializeObject<List<AboutModel>>(responseData);
                vm = vmlist[0];
                Common.VideoUrl = vm.VideoUrl;

            }
            return PartialView("About", vm);
        }
        public async Task<ActionResult> Owner()
        {
            var vmlist = new List<OwnerModel>();
            string general = url + "Owner/GetAllOnlineOwners";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<OwnerModel>>(responseData);
            }
            return PartialView("Owner", vmlist);
        }
        public async Task<ActionResult> Hotel()
        {
            var vmlist = new List<HotelModel>();
            string general = url + "Hotel/GetAllOnlineHotels";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<HotelModel>>(responseData);
            }
            return PartialView("Hotel", vmlist);
        }
        public async Task<ActionResult> News()
        {
            var vmlist = new List<NewsModel>();
            string general = url + "News/GetAllOnlineNews";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<NewsModel>>(responseData);
            }
            return PartialView("News", vmlist);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}