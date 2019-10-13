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
    public class BackageController : Controller
    {

        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];
        public BackageController()
        {
            //if (Common.CurrentLang == "ar")
            //    Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Backage
        public async  Task<ActionResult> Index()
        {
            var vmlist = new List<BackageModel>();
            string general = url + "/Backages/GetAllOnlineBackages";
            HttpResponseMessage responseMessage = await _client.GetAsync(general);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<BackageModel>>(responseData);
            }

            return View(vmlist);


        }// GET: Backage/Details/5
        public ActionResult Details(int id = 0)
        {
            var BackageModel = new BackageModel();
            var general = url + "Backages/GetBackageById?backageId=" + id;
            var responseMessage =  _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(BackageModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            BackageModel = JsonConvert.DeserializeObject<BackageModel>(responseData);
            return View(BackageModel);
        }
        // GET: Backage/RelatedBackageById/5
        public ActionResult RelatedBackages(int BackageId = 0)
        {
            var backageModel = new List<BackageModel>();
            var general = url + "Backages/GetAllOnlineRelatedBackagesById?backageId=" + BackageId;
            var responseMessage = _client.GetAsync(general).Result;
            if (!responseMessage.IsSuccessStatusCode) return View(backageModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            backageModel = JsonConvert.DeserializeObject<List<BackageModel>>(responseData);
            return PartialView(backageModel);
        }
        [HttpPost]
        // [HandleError]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Details(BackageReservationModel backageForm)
        { 
            backageForm.BackageId = backageForm.BackageId;

            if (string.IsNullOrEmpty(backageForm.FullName))
                ModelState.AddModelError("FirstName", "Last_Name_Required");
            if (string.IsNullOrEmpty(backageForm.Email))
                ModelState.AddModelError("Email", "Email_Required");
            if (string.IsNullOrEmpty(backageForm.PhoneNo))
                ModelState.AddModelError("PhoneNo", "PhoneNo_Required");
            //if (string.IsNullOrEmpty(backageForm.CheckIn))
            //    ModelState.AddModelError("Attach", "Attach_file_Required");
            var general = url + "BackageReservations";

            if (ModelState.IsValid)
            {
                HttpResponseMessage responseMessageApi = await _client.PostAsJsonAsync(general, backageForm);
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

            return View(backageForm);
        }

        [HttpPost]
        public ActionResult CommentForm(BackageReservationModel comment)
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