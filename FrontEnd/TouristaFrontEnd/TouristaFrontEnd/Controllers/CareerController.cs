using System;
using System.Collections.Generic;
using System.IO;
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
    public class CareerController : Controller
    {
        // GET: Career
        private readonly HttpClient _client;
        private readonly string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"];

        public CareerController()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Career
        //[HandleError]
        public async Task<ActionResult> Index()
        {
            string career = "";
            var vmlist = new List<CareerModel>();
            career = url + "Careers/GetAllCareers";
            var careerModels = new List<CareerModel>();

            if (career == null) throw new ArgumentNullException(nameof(career));
            HttpResponseMessage responseMessage = await _client.GetAsync(career);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                vmlist = JsonConvert.DeserializeObject<List<CareerModel>>(responseData);
            }

            return View(vmlist);
        }

        //public async Task<ActionResult> Details(int id)
        //{
        //    string careerDetails = url + "Career/GetCareerDetails/" + id;
        //    var careerModels = new CareerModel();
        //    var careerForm = new CareerForm();

        //    if (careerDetails == null) throw new ArgumentNullException(nameof(careerDetails));
        //    HttpResponseMessage responseMessageApi = await _client.GetAsync(careerDetails);
        //    if (responseMessageApi.IsSuccessStatusCode)
        //    {
        //        var responseData = responseMessageApi.Content.ReadAsStringAsync().Result;
        //        careerModels = JsonConvert.DeserializeObject<CareerModel>(responseData);
        //        careerForm.CareerId = careerModels.Id;
        //        careerForm.CareerTitle = careerModels.Title;
        //    }
        //    ViewBag.Title = careerModels.Title;
        //    return RedirectToAction("Upload", careerForm);

        //    //return View(careerForm);
        //}

        //// [HandleError]
        //public ActionResult Upload(CareerForm careerForm)
        //{
        //    return View(careerForm);
        //}

        //[HttpPost]
        //// [HandleError]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> Upload(CareerForm careerForm, HttpPostedFileBase file)
        //{
        //    string fileName = "";
        //    var fileDetails = new List<FileDetail>();

        //    if (file != null && file.ContentLength > 0)
        //    {
        //        fileName = Path.GetFileName(file.FileName);
        //        FileDetail fileDetail = new FileDetail()
        //        {
        //            FileName = fileName,
        //            Extension = Path.GetExtension(fileName),
        //            Id = Guid.NewGuid()
        //        };
        //        fileDetails.Add(fileDetail);

        //        var path = Path.Combine(Server.MapPath("~/Uploads/"), fileDetail.Id + fileDetail.Extension);
        //        file.SaveAs(path);
        //        careerForm.Attach = fileDetails[0].Id.ToString() + fileDetails[0].Extension.ToString();
        //    }

        //    careerForm.CareerId = careerForm.CareerId;

        //    if (string.IsNullOrEmpty(careerForm.FirstName))
        //        ModelState.AddModelError("FirstName", Global.Last_Name_Required);
        //    if (string.IsNullOrEmpty(careerForm.LastName))
        //        ModelState.AddModelError("LastName", Global.Last_Name_Required);
        //    if (string.IsNullOrEmpty(careerForm.Email))
        //        ModelState.AddModelError("Email", Global.Email_Required);
        //    if (string.IsNullOrEmpty(careerForm.PhoneNo))
        //        ModelState.AddModelError("PhoneNo", Global.PhoneNo_Required);
        //    if (string.IsNullOrEmpty(careerForm.Attach))
        //        ModelState.AddModelError("Attach", Global.Attach_file_Required);

        //    if (ModelState.IsValid)
        //    {
        //        HttpResponseMessage responseMessageApi = await _client.PostAsJsonAsync("CareerForm/Save/", careerForm);
        //        if (responseMessageApi.IsSuccessStatusCode)
        //        {
        //            var responseData = responseMessageApi.Content.ReadAsStringAsync().Result;
        //            //  careerForm = JsonConvert.DeserializeObject<CareerForm>(responseData);
        //            if (responseData != null)
        //            {
        //                TempData["alertMessage"] = "Thanks, Kindly our team will contact with you shortly";
        //            }
        //        }
        //        return RedirectToAction("Index");
        //    }

        //    return View(careerForm);
        //}

    }
}