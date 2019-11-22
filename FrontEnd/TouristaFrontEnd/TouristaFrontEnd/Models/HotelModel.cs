using System;
using System.Collections.Generic;

namespace Tourista.API.Models
{
    public class HotelModel
    {
        public long HotelId { get; set; }
        public Dictionary<string, string> TitleDictionary { get; set; }
        public Dictionary<string, string> DescriptionDictionary { get; set; }

        public int Star { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public List<string> ImagesURL { get; set; }
        public List<int> RemoveImages { get; set; }
        public long CityId { get; set; }
        public virtual ICollection<HotelFeatureModel> HotelFeature { get; set; }
        

        public bool IsDeleted { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public long? DeleterUserId { get; set; }
        public CityModel City { get; set; }
        public CurrencyModel Currency { get; set; }

    }
}
