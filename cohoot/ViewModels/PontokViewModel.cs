using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using cohoot.Services;
using System.Threading.Tasks;
using System;

namespace cohoot.ViewModels
{
    public class PontokViewModel : INotifyPropertyChanged
    {
        private readonly PontokService _pontokService;

        private string _selectedCategory;
        public ObservableCollection<PontokDisplayModel> Pontok { get; set; }
        public string SelectedCategory
        {
            get => _selectedCategory;
            set
            {
                if (_selectedCategory != value)
                {
                    _selectedCategory = value;
                    Console.WriteLine("Kiválasztott kategória:" + _selectedCategory);
                    OnPropertyChanged();
                    Task.Run(() => LoadPontokByCategoryAsync());
                }
            }
        }

        public PontokViewModel()
        {
            _pontokService = new PontokService();
            Pontok = new ObservableCollection<PontokDisplayModel>();
            SelectedCategory = "";
        }

        public async Task LoadPontokByCategoryAsync()
        {
            try
            {
                Console.WriteLine($"Betöltés indul: {SelectedCategory}"); // Hibakeresés
                var pontokList = await _pontokService.GetPontokByCategoryAsync(SelectedCategory);
                Console.WriteLine($"Talált {pontokList.Count} adatot a(z) {SelectedCategory} kategóriában.");

                var pontokToDisplay = new ObservableCollection<PontokDisplayModel>();

                int index = 1;  // Kezdjük az indexet 1-től
                foreach (var pont in pontokList)
                {
                    int pontszam = SelectedCategory switch
                    {
                        "Foldrajz" => pont.FoldrajzPont,
                        "Tortenelem" => pont.TortenelemPont,
                        "Matematika" => pont.MatematikaPont,
                        "Film" => pont.FilmPont,
                        _ => 0
                    };

                    Console.WriteLine($"Felhasználó: {pont.FelhasznaloNev}, Pontszám: {pontszam}");

                    pontokToDisplay.Add(new PontokDisplayModel
                    {
                        sszam = index++,  // Növeljük az indexet minden új elem hozzáadásakor
                        FelhasznaloNev = pont.FelhasznaloNev,
                        Pontszam = pontszam
                    });
                }

                // A UI frissítése a fő szálon
                Device.BeginInvokeOnMainThread(() =>
                {
                    Pontok.Clear();
                    foreach (var item in pontokToDisplay)
                    {
                        Pontok.Add(item);
                    }
                    OnPropertyChanged(nameof(Pontok));
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba történt: {ex.Message}");
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

    public class PontokDisplayModel
    {
        public int sszam { get; set; }
        public string FelhasznaloNev { get; set; }
        public int Pontszam { get; set; }
    }
}
