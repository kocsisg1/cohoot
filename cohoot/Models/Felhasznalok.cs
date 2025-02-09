using System;
using System.Collections.Generic;

namespace cohoot.Models;

public partial class Felhasznalok
{
    public int Id { get; set; }

    public string FelhasznaloNev { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string Hash { get; set; } = null!;

    public int Pont { get; set; }
}
