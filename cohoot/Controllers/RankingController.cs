using cohoot.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cohoot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RankingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            using (var context = new CohootContext())
            {
                try
                {
                    //var response = context.Felhasznaloks
                    //    .Select(f => new
                    //    {
                    //        f.FelhasznaloNev,
                    //        f.Pont
                    //    })
                    //    .ToList();

                    var response = context.Felhasznaloks.OrderByDescending(x => x.Pont).Take(5).Select(f => new
                      {
                           f.FelhasznaloNev,
                           f.Pont
                      }).ToList();

                    return Ok(response);
                }
                catch (Exception ex)
                {
                    var hiba = new List<object>
            {
                new { FelhasznaloNev = ex.Message, Pont = 0 }
            };

                    return BadRequest(hiba);
                }
            }
        }
    }
}
