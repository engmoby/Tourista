using System;
using System.Collections.Generic;
using Tourista.Common;

namespace Tourista.API.Models
{
    public class GeneralModel
    {
        public List<AboutModel> About { get; set; }
        public List<NewsModel> News { get; set; }
        public List<HotelModel> Hotel { get; set; }
        public List<OwnerModel> Owner { get; set; }
        public List<ContactModel> Contact { get; set; }
        public List<CountryModel> Country { get; set; }
        public List<BackageModel> Backage { get;  set; }
    }
}