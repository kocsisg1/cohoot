using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using cohoot.Models;
using cohoot.Services;
using Microsoft.EntityFrameworkCore;
using cohoot.DTOs;


namespace cohoot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Registry(RegisterDTO register)
        {
            using (var cx = new CohootContext())
            {
                try
                {
                    if (cx.Felhasznaloks.FirstOrDefault(f => f.FelhasznaloNev == register.LoginName) is not null)
                    {
                        return BadRequest("A felhasználónév foglalt");
                    }
                    if (cx.Felhasznaloks.FirstOrDefault(f => f.Email == register.Email) is not null)
                    {
                        return BadRequest("Ezzel az email címmel már regisztráltak fiókot!");
                    }
                    //user.Hash = SecurityService.CreateSHA256(user.Hash);

                    var salt = SecurityService.GenerateSalt();
                    var user = new Felhasznalok
                    {
                        FelhasznaloNev = register.LoginName,
                        Email = register.Email,
                        Salt = salt,
                        Hash = SecurityService.CreateSHA256(SecurityService.CreateSHA256(salt + register.Password))
                    };

                    await cx.Felhasznaloks.AddAsync(user);
                    await cx.SaveChangesAsync();


                    return Ok("Sikeres regisztráció! Most már bejelentkezhetsz!");
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
