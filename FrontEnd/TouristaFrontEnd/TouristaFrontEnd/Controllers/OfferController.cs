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
    public class OfferController : Controller
    {

        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public OfferController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Offer
        public async  Task<ActionResult> Index()
        {
            var vmlist = new List<OfferModel>();
            string general = url + "/Offers/GetAllOnlineOffers";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<OfferModel>>(responseData);
            }

            return View(vmlist);


        }// GET: Offer/Details/5
        public ActionResult Details(int id = 0)
        {
            var OfferModel = new OfferModel();
            var general = url + "Offers/GetOfferById?OfferId=" + id;
            var responseMessage =  _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(OfferModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            OfferModel = JsonConvert.DeserializeObject<OfferModel>(responseData);
            return View(OfferModel);
        }
        // GET: Offer/RelatedOfferById/5
        public ActionResult RelatedOffers(int OfferId = 0)
        {
            var OfferModel = new List<OfferModel>();
            var general = url + "Offers/GetAllOnlineRelatedOffersById?OfferId=" + OfferId;
            var responseMessage = _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(OfferModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            OfferModel = JsonConvert.DeserializeObject<List<OfferModel>>(responseData);
            return PartialView(OfferModel);
        }
        [HttpPost]
        // [HandleError]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Details(OfferReservationModel OfferForm)
        { 
            OfferForm.OfferId = OfferForm.OfferId;

            if (string.IsNullOrEmpty(OfferForm.FullName))
                ModelState.AddModelError("FirstName", "Last_Name_Required");
            if (string.IsNullOrEmpty(OfferForm.Email))
                ModelState.AddModelError("Email", "Email_Required");
            if (string.IsNullOrEmpty(OfferForm.PhoneNo))
                ModelState.AddModelError("PhoneNo", "PhoneNo_Required");
            //if (string.IsNullOrEmpty(OfferForm.CheckIn))
            //    ModelState.AddModelError("Attach", "Attach_file_Required");
            var general = url + "OfferReservations";

            if (ModelState.IsValid)
            {
                HttpResponseMessage responseMessageApi = await _client.PostAsJsonAsync(general, OfferForm);
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

            return View(OfferForm);
        }

        [HttpPost]
        public ActionResult CommentForm(OfferReservationModel comment)
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