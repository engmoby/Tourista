using System;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

using System.Web.Http;
using TouristaFrontEnd.Helper;


namespace TouristaFrontEnd
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }


        private void Application_BeginRequest(Object source, EventArgs e)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies["Language"];

            if (cookie?.Value != null)
            {
                System.Threading.Thread.CurrentThread.CurrentCulture =
                    new System.Globalization.CultureInfo(cookie.Value);

                System.Threading.Thread.CurrentThread.CurrentUICulture =
                    new System.Globalization.CultureInfo(cookie.Value);
                //Fix for Different Language in Static & Dynamic Content
                Common.CurrentLang = cookie.Value;
            }
            else
            {
                System.Threading.Thread.CurrentThread.CurrentCulture =
                    new System.Globalization.CultureInfo("en");
                System.Threading.Thread.CurrentThread.CurrentUICulture =
                    new System.Globalization.CultureInfo("en");
                Common.CurrentLang = "en";
            }
        }
        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exc = Server.GetLastError();
            Server.ClearError();
            Response.Redirect("/Error/Index");
        }
    }
}
