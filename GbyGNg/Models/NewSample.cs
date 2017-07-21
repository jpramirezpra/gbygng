using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace GbyGNg.Models
{
    public class NewSample
    {
        public string Barcode { get; set; }

        public int StatusId { get; set; }

        public int UserId { get; set; }

    }
}