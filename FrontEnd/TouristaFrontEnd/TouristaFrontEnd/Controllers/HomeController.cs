using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using Tourista.API.Models;
using TouristaFrontEnd.Helper;
using TouristaFrontEnd.Models;

namespace TouristaFrontEnd.Controllers
{
    public class HomeController : Controller
    {
        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public HomeController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public async Task<ActionResult> Index()
        {
            var vmlist = await GeneralModel();

            return View(vmlist);
        }

        private async Task<GeneralModel> GeneralModel()
        {
            var vmlist = new GeneralModel();
            string general = url + "General/GetAllGeneral";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<GeneralModel>(responseData);
                Common.VideoUrl = vmlist.About[0].VideoUrl;
                Common.GeneralModel = vmlist;
            }
            return vmlist;
        }

        public ActionResult AboutHome()
        {
            return PartialView();
        }
        public ActionResult HotelHome()
        {
            return PartialView();
        }
        public ActionResult OwnerHome()
        {
            return PartialView();
        }
        public ActionResult NewsHome()
        {
            return PartialView();
        }
        public ActionResult ContactUsHome()
        {
            return PartialView();
        }
        public ActionResult Footer()
        {
            if (Common.GeneralModel == null)
            {
                var vmlist = new GeneralModel();
                string general = url + "General/GetAllGeneral";
                HttpResponseMessage responseMessage =   _client.GetAsync(general).Result;
                if (responseMessage.IsSuccessStatusCode)
                {
                    var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                    vmlist = JsonConvert.DeserializeObject<GeneralModel>(responseData); 
                    Common.GeneralModel = vmlist;
                }
            }
            return PartialView();
        }
    }
}