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

        [HttpGet("Matematika")]
        public IActionResult GetMatematika()
        {
            using (var context = new CohootContext())
            {
                try
                {
                    var response = context.Felhasznaloks.Join(context.Pontoks,
                        user => user.Id,
                        points => points.FelhasznaloId,
                        (user, points) => new {
                            UserName = user.FelhasznaloNev,
                            Points = points.MatematikaPont
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

        [HttpGet("Film")]
        public IActionResult GetFilm()
        {
            using (var context = new CohootContext())
            {
                try
                {
                    var response = context.Felhasznaloks.Join(context.Pontoks,
                        user => user.Id,
                        points => points.FelhasznaloId,
                        (user, points) => new {
                            UserName = user.FelhasznaloNev,
                            Points = points.FilmPont
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

        [HttpGet("Tortenelem")]
        public IActionResult GetTortenelem()
        {
            using (var context = new CohootContext())
            {
                try
                {
                    var response = context.Felhasznaloks.Join(context.Pontoks,
                        user => user.Id,
                        points => points.FelhasznaloId,
                        (user, points) => new {
                            UserName = user.FelhasznaloNev,
                            Points = points.TortenelemPont
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
