using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TouristaFrontEnd.Startup))]
namespace TouristaFrontEnd
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
