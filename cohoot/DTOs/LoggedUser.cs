namespace cohoot.DTOs
{
    public class LoggedUser
    {

        public int Id { get; set; }

        public string FelhasznaloNev { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Token { get; set; }
    }
}
