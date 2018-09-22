using System.IO;

namespace Tourista.BLL.Services.FormToMail
{
    public interface IFormToMail
    {
        void SendMail(string subj, string message,string mailTo);
    }
}
