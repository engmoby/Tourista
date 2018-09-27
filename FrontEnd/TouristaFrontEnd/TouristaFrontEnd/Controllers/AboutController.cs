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
    public class AboutController : Controller
    {
        // GET: About
        private readonly HttpClient _client;
        private string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public AboutController()
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
            var vm = new AboutModel();
            var vmlist = new List<AboutModel>();
            string general = url + "About/GetAllAbout";
            _client.BaseAddress = new Uri(general);

            _client.DefaultRequestHeaders.Add("TenantId", "1");

            var responseMessage = _client.GetAsync(general).Result;

            //HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;

                vmlist = JsonConvert.DeserializeObject<List<AboutModel>>(responseData);
                vm = vmlist[0];
            }
            return View(vm);
        }

    }
}
