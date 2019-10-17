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
    public class TourController : Controller
    {

        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public TourController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Tour
        public async  Task<ActionResult> Index()
        {
            var vmlist = new List<TourModel>();
            string general = url + "/Tours/GetAllOnlineTours";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<TourModel>>(responseData);
            }

            return View(vmlist);


        }// GET: Tour/Details/5
        public ActionResult Details(int id = 0)
        {
            var TourModel = new TourModel();
            var general = url + "Tours/GetTourById?TourId=" + id;
            var responseMessage =  _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(TourModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            TourModel = JsonConvert.DeserializeObject<TourModel>(responseData);
            return View(TourModel);
        }
        // GET: Tour/RelatedTourById/5
        public ActionResult RelatedTours(int TourId = 0)
        {
            var TourModel = new List<TourModel>();
            var general = url + "Tours/GetAllOnlineRelatedToursById?TourId=" + TourId;
            var responseMessage = _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(TourModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            TourModel = JsonConvert.DeserializeObject<List<TourModel>>(responseData);
            return PartialView(TourModel);
        }
        [HttpPost]
        // [HandleError]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Details(TourReservationModel TourForm)
        { 
            TourForm.TourId = TourForm.TourId;

            if (string.IsNullOrEmpty(TourForm.FullName))
                ModelState.AddModelError("FirstName", "Last_Name_Required");
            if (string.IsNullOrEmpty(TourForm.Email))
                ModelState.AddModelError("Email", "Email_Required");
            if (string.IsNullOrEmpty(TourForm.PhoneNo))
                ModelState.AddModelError("PhoneNo", "PhoneNo_Required");
            //if (string.IsNullOrEmpty(TourForm.CheckIn))
            //    ModelState.AddModelError("Attach", "Attach_file_Required");
            var general = url + "TourReservations";

            if (ModelState.IsValid)
            {
                HttpResponseMessage responseMessageApi = await _client.PostAsJsonAsync(general, TourForm);
                if (responseMessageApi.IsSuccessStatusCode)
                {
                    var responseData = responseMessageApi.Content.ReadAsStringAsync().Result;
                    if (responseData != null)
                    {
                        TempData["alertMessage"] = "Thanks, Kindly our team will contact with you shortly";
                    }
                }
                return RedirectToAction("Index");
            }

            return View(TourForm);
        }

        [HttpPost]
        public ActionResult CommentForm(TourReservationModel comment)
        {
            //Comment ajaxComment = new Comment();
            //ajaxComment.CommentText = comment.UserName;
            //ajaxComment.DateCreated = comment.DateCreated;
            //ajaxComment.PostId = comment.PostId;
            //ajaxComment.UserName = comment.UserName;

            //mRep.Add(ajaxComment);
            //uow.Save();
            //Get all the comments for the given post id

            return Json(null);


        }
    }
}