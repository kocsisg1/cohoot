using System;
using System.Collections.Generic;

namespace cohoot.Models;

public partial class Quiz
{
    public int Id { get; set; }

    public string Kategoria { get; set; } = null!;

    public string Kerdes { get; set; } = null!;

    public string Valasz1 { get; set; } = null!;

    public string Valasz2 { get; set; } = null!;

    public string Valasz3 { get; set; } = null!;

    public string Valasz4 { get; set; } = null!;

    public int Helyes { get; set; }
}
