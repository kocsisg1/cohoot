using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cohoot.Models;

namespace cohoot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            using (var context = new CohootContext())
            {
                try
                {
                    var response = context.Quizzes.OrderBy(r=>EF.Functions.Random()).Take(1).First();
                    return Ok(response);
                }
                catch (Exception ex)
                {
                    List<Quiz> hiba = new List<Quiz>();
                    hiba.Add(new Quiz()
                    {
                        Kategoria = ex.Message
                    });
                    return BadRequest(hiba);
                }

            }

        }
    }
}
