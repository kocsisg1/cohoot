using System.Drawing;
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
                    //var response2 = context.Felhasznaloks.OrderByDescending(x => x.FelhasznaloNev).Take(5).Select(f => new
                    //{

                    //    f.FelhasznaloNev
                    //}).ToList();

                    //var response = context.Pontoks.OrderByDescending(x => x.FoldrajzPont).Take(5).Select(f => new
                    //  {

                    //       f.FoldrajzPont
                    //  }).ToList();

                    var response = context.Felhasznaloks.Join(context.Pontoks, 
                        user => user.Id,
                        points => points.FelhasznaloId,
                        (user, points) => new {
                            UserName = user.FelhasznaloNev,
                            Points = points.FoldrajzPont
                        }).OrderByDescending(userPoints => userPoints.Points).Take(5).ToList();


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
