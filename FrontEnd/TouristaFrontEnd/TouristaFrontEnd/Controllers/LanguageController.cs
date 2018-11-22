using System;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using TouristaFrontEnd.Helper;

namespace TouristaFrontEnd.Controllers
{
    public class LanguageController : Controller
    {
        private readonly HttpClient _client;

        private string url = System.Configuration.ConfigurationManager.AppSettings["ServerIp"] + "/SystemParameters/";

        public LanguageController()
        {
            if (Common.CurrentLang == "ar")
                Thread.CurrentThread.CurrentCulture = new CultureInfo("ar-EG");
            _client = new HttpClient();
          //  _client.BaseAddress = new Uri(url);
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Lang
        public static void Change(string selectedLanguage)
        {
            Common.CurrentLang = selectedLanguage;
        }

        public ActionResult ChangeLanguage(string selectedLanguage)
        {
            if (selectedLanguage != null)
            {
                var cookie = new HttpCookie("Language");
                cookie.Value = selectedLanguage;
                Response.Cookies.Add(cookie);
                Common.CurrentLang = selectedLanguage;

                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(selectedLanguage);
                Thread.CurrentThread.CurrentUICulture = new CultureInfo(selectedLanguage);
            }
             

            return Redirect(Request.UrlReferrer.ToString());
        }
    }
}