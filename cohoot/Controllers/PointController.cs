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
                    { // Földrajz
                        pointok.FoldrajzPont = (point.Pontok > pointok.FoldrajzPont ? point.Pontok : pointok.FoldrajzPont);
                    }
                    else if (point.Kategoria == 1)
                    { // Matek
                        pointok.MatematikaPont = (point.Pontok > pointok.MatematikaPont ? point.Pontok : pointok.MatematikaPont); ;
                    }
                    else if (point.Kategoria == 2)
                    { // Film
                        pointok.FilmPont = (point.Pontok > pointok.FilmPont ? point.Pontok : pointok.FilmPont); ;
                    }
                    else if (point.Kategoria == 3)
                    { // Történelem
                        pointok.TortenelemPont = (point.Pontok > pointok.TortenelemPont ? point.Pontok : pointok.TortenelemPont); ;
                    }    
                }
                await cx.SaveChangesAsync();
            }
        }
    }
}
