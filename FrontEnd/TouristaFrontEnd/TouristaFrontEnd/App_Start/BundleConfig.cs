using System.Web;
using System.Web.Optimization;

namespace TouristaFrontEnd
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/libs/jquery/jquery-2.2.3.min.js",
                "~/Scripts/libs/bootstrap/js/bootstrap.min.js",
                "~/Scripts/libs/detect-browser/browser.js",
                "~/Scripts/libs/smooth-scroll/jquery-smoothscroll.js",
                "~/Scripts/libs/wow-js/wow.min.js",
                "~/Scripts/libs/slick-slider/slick.min.js",
                "~/Scripts/libs/selectbox/js/jquery.selectbox-0.2.js",
                "~/Scripts/libs/please-wait/please-wait.min.js",
                 "~/Scripts/js/main.js",
                "~/Scripts/js/pages/home-page.js",
                "~/Scripts/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js",
            "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //    "~/Content/bootstrap.css",
            //    "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/font/font-icon/font-awesome/css/font-awesome.css",
                "~/Content/font/font-icon/font-flaticon/flaticon.css",
                "~/Scripts/libs/bootstrap/css/bootstrap.min.css",
                "~/Scripts/libs/animate/animate.css",
                "~/Scripts/libs/slick-slider/slick.css",
                "~/Scripts/libs/slick-slider/slick-theme.css",
                "~/Scripts/libs/selectbox/css/jquery.selectbox.css",
                "~/Scripts/libs/please-wait/please-wait.css",
                //"~/Content/layout.css",
               // "~/Content/components.css",
                "~/Content/responsive.css",
                "~/Scripts/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css"
                ));


        }
    }
}
