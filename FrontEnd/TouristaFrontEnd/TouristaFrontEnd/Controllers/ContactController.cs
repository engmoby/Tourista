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
using TouristaFrontEnd.Helper;

namespace TouristaFrontEnd.Controllers
{
    public class ContactController : Controller
    {
        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public ContactController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        // GET: Contact
        //public ActionResult Index()
        //{
        //    if (Common.GeneralModel == null)
        //    {
        //        var vmlist = new GeneralModel();
        //        string general = url + "General/GetAllGeneral";
        //        HttpResponseMessage responseMessage = _client.GetAsync(general).Result;
        //        if (responseMessage.IsSuccessStatusCode)
        //        {
        //            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
        //            vmlist = JsonConvert.DeserializeObject<GeneralModel>(responseData);
        //            Common.GeneralModel = vmlist;
        //        }
        //    }

        //    return View();
        //}
        public async Task<ActionResult> Index()
        {
            var vm = new ContactModel();
            var vmlist = new List<ContactModel>();
            string general = url + "Contact/GetAllContact";
            _client.BaseAddress = new Uri(general); 
            var responseMessage = _client.GetAsync(general).Result;
             
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;

                vmlist = JsonConvert.DeserializeObject<List<ContactModel>>(responseData);
                vm = vmlist[0];
            }
            return View(vm);
        }


        // GET: Contact/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Contact/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

         }
}
