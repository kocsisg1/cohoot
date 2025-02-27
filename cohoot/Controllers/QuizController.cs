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
        private static List<int> _sentQuizIds = new List<int>();

        [HttpGet]
        public IActionResult Get()
        {
            using (var context = new CohootContext())
            {
                try
                {
                    var quizzes = context.Quizzes
                        .Where(q => q.Id >= 1 && q.Id <= 10 && !_sentQuizIds.Contains(q.Id))
                        .OrderBy(r => EF.Functions.Random())
                        .Take(1)
                        .ToList();

                    if (quizzes.Count == 0)
                    {
                        return Ok(new { message = "end" });
                    }

                    var quiz = quizzes.First();
                    _sentQuizIds.Add(quiz.Id);
                    return Ok(quiz);
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

        [HttpPost("reset")]
        public IActionResult Reset()
        {
            _sentQuizIds.Clear();
            return Ok("Quiz list has been reset.");
        }
    }
}
