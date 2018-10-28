 
using System.Collections.Generic;
using Tourista.API.Models;
using TouristaFrontEnd.Models;

namespace TouristaFrontEnd.Helper
{
    public class Common
    {
        public static string CurrentLang = "en";
        public static string VideoUrl = "";

        public static List<OwnerModel> OwnerList { get; set; }
        public static List<NewsModel> NewsList { get; set; }
        public static GeneralModel GeneralModel { get; set; }
    }
}