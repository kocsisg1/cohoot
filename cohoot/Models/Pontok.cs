using System;
using System.Collections.Generic;

namespace cohoot.Models;

public partial class Pontok
{
    public int Id { get; set; }

    public int FelhasznaloId { get; set; }

    public int FoldrajzPont { get; set; }

    public int MatematikaPont { get; set; }

    public int FilmPont { get; set; }

    public int TortenelemPont { get; set; }

    public virtual Felhasznalok Felhasznalo { get; set; } = null!;
}
