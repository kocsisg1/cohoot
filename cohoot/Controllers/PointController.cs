using cohoot.DTOs;
using cohoot.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cohoot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> GivePoints(PointDTO point)
        {
            using (var cx = new CohootContext())
            {
                var pointok = await cx.Pontoks.FirstOrDefaultAsync(p => p.FelhasznaloId == point.Id);

                if (pointok == null)
                {
                    cx.Pontoks.Add(new Pontok
                    {
                        FelhasznaloId = point.Id
                    });
                    await cx.SaveChangesAsync();
                    await GiveActualPoints(point);
                }
                else
                {
                    await GiveActualPoints(point);
                }

            }
            return Ok("Siker");
        }

        private async Task GiveActualPoints(PointDTO point) {
            using (var cx = new CohootContext())
            {
                var pointok = await cx.Pontoks.FirstOrDefaultAsync(p => p.FelhasznaloId == point.Id);
                if (pointok != null)
                {
                    if(point.Kategoria == 0)
                    { // Matematika
                        pointok.FoldrajzPont += point.Pontok;
                    }
                    else if (point.Kategoria == 1)
                    { // Magyar
                        pointok.MatematikaPont += point.Pontok;
                    }
                    else if (point.Kategoria == 2)
                    { // Történelem
                        pointok.FilmPont += point.Pontok;
                    }
                    else if (point.Kategoria == 3)
                    { // Földrajz
                        pointok.TortenelemPont += point.Pontok;
                    }    
                }
                await cx.SaveChangesAsync();
            }
        }
    }
}
