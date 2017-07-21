using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using GbyGNg;
using GbyGNg.Models;

namespace GbyGNg.Controllers
{
    public class SamplesController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/Samples
        public async Task<IHttpActionResult> GetSamples()
        {
            return Ok(new {
                data = db.Samples.Select(s => new { s.SampleId, s.User.FirstName, s.User.LastName, s.Barcode, s.Status.StatusName, s.User.UserId, s.Status.StatusId, s.CreatedAt})
            });
        }

        // GET: api/Samples/5
        [ResponseType(typeof(Sample))]
        public async Task<IHttpActionResult> GetSample(int id)
        {
            Sample sample = await db.Samples.FindAsync(id);
            if (sample == null)
            {
                return NotFound();
            }

            return Ok(sample);
        }

        // POST: api/Samples
        [ResponseType(typeof(Sample))]
        public async Task<IHttpActionResult> PostSample(NewSample newSample)
        {
            Sample sample = new Sample();
            sample.Barcode = newSample.Barcode;
            sample.CreatedBy = newSample.UserId;
            sample.StatusId = newSample.StatusId;
            sample.CreatedAt = DateTime.Today;

            //Auto-increment set off due to seeding db
            sample.SampleId = db.Samples.Count() + 1;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Samples.Add(sample);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (SampleExists(sample.SampleId))
                {
                    return Conflict();
                }
                else
                {
                    return InternalServerError(ex) ;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = sample.SampleId }, sample);
        }

        // DELETE: api/Samples/5
        [ResponseType(typeof(Sample))]
        public async Task<IHttpActionResult> DeleteSample(int id)
        {
            Sample sample = await db.Samples.FindAsync(id);
            if (sample == null)
            {
                return NotFound();
            }

            db.Samples.Remove(sample);
            await db.SaveChangesAsync();

            return Ok(sample);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SampleExists(int id)
        {
            return db.Samples.Count(e => e.SampleId == id) > 0;
        }
    }
}