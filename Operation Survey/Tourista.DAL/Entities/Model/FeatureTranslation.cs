using System.ComponentModel.DataAnnotations;
using Repository.Pattern.Ef6;

namespace Tourista.DAL.Entities.Model
{
    public class FeatureTranslation : Entity
    {
      [Key]
        public long FeaturesTranslationId { get; set; }
        public string Language { get; set; } 
        public string Title { get; set; }
        public long FeatureId { get; set; }
        public virtual Feature Features { get; set; }
        
    }
}
