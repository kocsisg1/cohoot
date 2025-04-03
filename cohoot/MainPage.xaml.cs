using cohoot.ViewModels;

namespace cohoot
{
    public partial class MainPage : ContentPage
    {
        private PontokViewModel _viewModel;
        private bool isactive = false;
        private bool isloading = true;
        public MainPage()
        {
            InitializeComponent();
            _viewModel = new PontokViewModel();
            BindingContext = _viewModel;
            Task.Run(async () => await _viewModel.LoadPontokByCategoryAsync());
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();
            if (_viewModel != null)
            {
                await _viewModel.LoadPontokByCategoryAsync();
            }
        }

        private async void OnCategoryChanged(object sender, EventArgs e)
        {
            if (_viewModel != null)
            {
                await _viewModel.LoadPontokByCategoryAsync();
            }
        }

       private void BackToMainPage(object sender, EventArgs e)
        { webView.Source = "http://localhost:3000/home";
            isactive=!isactive;
            webView.IsVisible = isactive;
            isloading = !isloading;
            témák.IsVisible = isloading;
            listview.IsVisible = isloading;
            ranglist.IsVisible = isloading;

            if (gomb.Text=="Főoldal megjelenítése")
            {
                gomb.Text = "Rangsor megjelenítése";
            }
            else
            {
                gomb.Text = "Főoldal megjelenítése";
            }

        }
    }
}