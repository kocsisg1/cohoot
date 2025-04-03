namespace cohoot.Models
{
    public class PontokModel
    {
        public int Id { get; set; }
        public int FelhasznaloId { get; set; }
        public string FelhasznaloNev { get; set; }
        public int FoldrajzPont { get; set; }
        public int MatematikaPont { get; set; }
        public int FilmPont { get; set; }
        public int TortenelemPont { get; set; }
        public int Helyezes { get; set; }

        public PontokModel(int id, int felhasznaloid, string felhasznalonev, int foldrajzpont, int matematikapont, int filmpont, int tortenelempont)
        {
            Id = id;
            FelhasznaloId = felhasznaloid;
            FelhasznaloNev = felhasznalonev;
            FoldrajzPont = foldrajzpont;
            MatematikaPont = matematikapont;
            FilmPont = filmpont;
            TortenelemPont = tortenelempont;
        }
        public PontokModel() { }
    }
}
