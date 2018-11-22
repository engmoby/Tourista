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
    public class HotelController : Controller
    {

        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public HotelController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Hotel
        public async  Task<ActionResult> Index()
        {
            var vmlist = new List<HotelModel>();
            string general = url + "/Hotels/GetAllOnlineHotels";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<HotelModel>>(responseData);
            }

            return View(vmlist);


        }// GET: Hotel/Details/5
        public ActionResult Details(int id = 0)
        {
            var HotelModel = new HotelModel();
            var general = url + "Hotels/GetHotelById?hotelId=" + id;
            var responseMessage =  _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(HotelModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            HotelModel = JsonConvert.DeserializeObject<HotelModel>(responseData);
            return View(HotelModel);
        }
        // GET: Hotel/RelatedHotelById/5
        public ActionResult RelatedHotels(int HotelId = 0)
        {
            var hotelModel = new List<HotelModel>();
            var general = url + "Hotels/GetAllOnlineRelatedHotelsById?hotelId=" + HotelId;
            var responseMessage = _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(hotelModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            hotelModel = JsonConvert.DeserializeObject<List<HotelModel>>(responseData);
            return PartialView(hotelModel);
        }
    }
}