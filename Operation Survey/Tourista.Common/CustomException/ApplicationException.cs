﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tourista.Common.CustomException
{
    public class ApplicationException:Exception
    {
        public ErrorCodes ErrorCode { get; set; }
        protected ApplicationException(ErrorCodes errorCode)
        {
            ErrorCode = errorCode;
        }
        public string ErrorCodeMessageKey
        {
            get { return  ErrorCode.ToString(); }
        }

    }
}
