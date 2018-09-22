namespace Tourista.BLL.DTOs
{
    public class HotelFeatureDto
    {

        public long HotelFeatureId { get; set; }

        public long HotelId { get; set; }
      //  public virtual HotelDto Hotel { get; set; }

        public long FeatureId { get; set; }
        public virtual FeatureDto Feature { get; set; }
        public int TenantId { get; set; }

    }
}
