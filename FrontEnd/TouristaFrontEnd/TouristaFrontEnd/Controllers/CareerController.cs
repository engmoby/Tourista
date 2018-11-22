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

        public async Task<ActionResult> Details(int id)
        {
            var CareerModel = new CareerModel();
            var careerForm = new CareerFormModel();
            var general = url + "Careers/GetCareerById?careerId=" + id;
            var responseMessage = await _client.GetAsync(general);
            if (!responseMessage.IsSuccessStatusCode) return View(CareerModel);
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;
            CareerModel = JsonConvert.DeserializeObject<CareerModel>(responseData);
            careerForm.CareerId = CareerModel.CareerId;
            ViewBag.Title = CareerModel.Title;
            return RedirectToAction("Upload", careerForm);

            //return View(careerForm);
        }

        // [HandleError]
        public ActionResult Upload(CareerFormModel careerForm)
        {
            return View(careerForm);
        }

        [HttpPost]
        // [HandleError]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Upload(CareerFormModel careerForm, HttpPostedFileBase file)
        {
            string fileName = "";
            var fileDetails = new List<FileDetail>();

            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                FileDetail fileDetail = new FileDetail()
                {
                    FileName = fileName,
                    Extension = Path.GetExtension(fileName),
                    Id = Guid.NewGuid()
                };
                fileDetails.Add(fileDetail);

                var path = Path.Combine(Server.MapPath("~/Uploads/"), fileDetail.Id + fileDetail.Extension);
                file.SaveAs(path);
                careerForm.File = fileDetails[0].Id.ToString() + fileDetails[0].Extension.ToString();
            }

            careerForm.CareerId = careerForm.CareerId;

            if (string.IsNullOrEmpty(careerForm.FullName))
                ModelState.AddModelError("FirstName", "Last_Name_Required"); 
            if (string.IsNullOrEmpty(careerForm.Email))
                ModelState.AddModelError("Email", "Email_Required");
            if (string.IsNullOrEmpty(careerForm.PhoneNo))
                ModelState.AddModelError("PhoneNo", "PhoneNo_Required");
            if (string.IsNullOrEmpty(careerForm.File))
                ModelState.AddModelError("Attach", "Attach_file_Required");
            var general = url + "CareerForms";

            if (ModelState.IsValid)
            {
                HttpResponseMessage responseMessageApi = await _client.PostAsJsonAsync(general, careerForm);
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

            return View(careerForm);
        }

    }
}