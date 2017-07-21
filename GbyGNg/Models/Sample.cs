namespace GbyGNg
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Sample
    {
        [Key, Column(Order =0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int SampleId { get; set; }

        [StringLength(50)]
        public string Barcode { get; set; }

        public DateTime? CreatedAt { get; set; }

        public int? CreatedBy { get; set; }

        public int? StatusId { get; set; }

        public virtual Status Status { get; set; }

        public virtual User User { get; set; }
    }
}
