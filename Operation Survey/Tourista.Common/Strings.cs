using System;
using System.Collections.Generic;

namespace Tourista.Common
{
    public class Strings
    {

        public const string JWT = "JWT";
        public const string userID = "UserID";
        public const string userName = "Name";
        public const string userRole = "Role";
        public const string TenantId = "TenantId";
        public const string PermissionId = "PermissionId";
        public const string TypeId = "TypeId";
        public static DateTime CurrentDateTime = DateTime.Now;


        public static readonly List<string> SupportedLanguages = new List<string> { "ar-eg", "en-US" };
        public const string DefaultLanguage = "en-US";
        public const int BackgroundId = 3;

        public const long DefaultTemplateId = 1;
    }
}
