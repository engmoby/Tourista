﻿using System.IO;

namespace Tourista.BLL.Services.ManageStorage
{
    public interface IManageStorage
    {
        void UploadImage(string path, MemoryStream image, string id);
    }
}
