using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cohoot.Models;
using cohoot.DTOs;
using cohoot.Services;

namespace cohoot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("GetSalt/{felhasznaloNev}")]

        public async Task<IActionResult> GetSalt(string felhasznaloNev)
        {
            using (var context = new CohootContext())
            {
                try
                {
                    Felhasznalok response = await context.Felhasznaloks.FirstOrDefaultAsync(u => u.FelhasznaloNev == felhasznaloNev);
                    if (response == null)
                    {
                        return NotFound("Nem található felhasználó ezzel a felhasználó névvel");
                    }
                    else
                    {
                        return Ok(response.Salt);
                    }
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            using (var context = new CohootContext())
            {
                try
                {
                    string Hash = SecurityService.CreateSHA256(loginDTO.TmpHash);
                    Felhasznalok loggedUser = await context.Felhasznaloks.FirstOrDefaultAsync(u => u.FelhasznaloNev == loginDTO.LoginName && u.Hash == Hash);

                    if (loggedUser != null)
                    {
                        string token = Guid.NewGuid().ToString();
                        /*lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, loggedUser);
                        }*/
                        return Ok(new LoggedUser
                        {
                            FelhasznaloNev = loginDTO.LoginName,
                            Email = loggedUser.Email,
                            Token = token
                        });
                    }
                    else
                    {
                        return BadRequest("LOL");
                    }
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
