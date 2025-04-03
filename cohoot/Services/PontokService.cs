using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Threading.Tasks;
using cohoot.Models;
using System.Data;
using System;

namespace cohoot.Services
{
    public class PontokService
    {
        private const string ConnectionString = "Server=localhost;Port=3306;Database=cohoot;Uid=root;Password=;";

        public async Task<List<PontokModel>> GetPontokByCategoryAsync(string category)
        {
            var pontokList = new List<PontokModel>();

            // Define the SQL query based on the provided category
            string query = category switch
            {
                "Foldrajz" => @"SELECT pontok.Id, pontok.FelhasznaloId, felhasznalok.FelhasznaloNev, 
                                        pontok.FoldrajzPont, pontok.MatematikaPont, pontok.FilmPont, pontok.TortenelemPont
                                 FROM pontok
                                 JOIN felhasznalok ON pontok.FelhasznaloId = felhasznalok.Id
                                 ORDER BY pontok.FoldrajzPont DESC LIMIT 5;",
                "Matematika" => @"SELECT pontok.Id, pontok.FelhasznaloId, felhasznalok.FelhasznaloNev, 
                                        pontok.MatematikaPont,pontok.FoldrajzPont, pontok.FilmPont, pontok.TortenelemPont
                                 FROM pontok
                                 JOIN felhasznalok ON pontok.FelhasznaloId = felhasznalok.Id
                                 ORDER BY pontok.MatematikaPont DESC LIMIT 5;",
                "Film" => @"SELECT pontok.Id, pontok.FelhasznaloId, felhasznalok.FelhasznaloNev, 
                                    pontok.FoldrajzPont, pontok.MatematikaPont, pontok.TortenelemPont, pontok.FilmPont
                            FROM pontok
                            JOIN felhasznalok ON pontok.FelhasznaloId = felhasznalok.Id
                            ORDER BY pontok.FilmPont DESC LIMIT 5;",
                "Tortenelem" => @"SELECT pontok.Id, pontok.FelhasznaloId, felhasznalok.FelhasznaloNev, 
                                        pontok.FoldrajzPont, pontok.MatematikaPont, pontok.FilmPont , pontok.TortenelemPont
                                 FROM pontok
                                 JOIN felhasznalok ON pontok.FelhasznaloId = felhasznalok.Id
                                 ORDER BY pontok.TortenelemPont DESC LIMIT 5;",
                _ => throw new ArgumentException("Invalid category") // Catch invalid category
            };

            try
            {
                using (var connection = new MySqlConnection(ConnectionString))
                {
                    await connection.OpenAsync();

                    using (var command = new MySqlCommand(query, connection))
                    {
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                // Handle potential NULL values in the database
                                pontokList.Add(new PontokModel
                                {
                                    Id = reader.GetInt32("Id"),
                                    FelhasznaloId = reader.GetInt32("FelhasznaloId"),
                                    FelhasznaloNev = reader.GetString("FelhasznaloNev"),  // FelhasznaloNev hozzáadása
                                    FoldrajzPont = reader.IsDBNull(reader.GetOrdinal("FoldrajzPont")) ? 0 : reader.GetInt32("FoldrajzPont"),
                                    MatematikaPont = reader.IsDBNull(reader.GetOrdinal("MatematikaPont")) ? 0 : reader.GetInt32("MatematikaPont"),
                                    FilmPont = reader.IsDBNull(reader.GetOrdinal("FilmPont")) ? 0 : reader.GetInt32("FilmPont"),
                                    TortenelemPont = reader.IsDBNull(reader.GetOrdinal("TortenelemPont")) ? 0 : reader.GetInt32("TortenelemPont")
                                });
                            }
                        }
                    }
                }

                return pontokList;
            }
            catch (Exception ex)
            {
                // Handle potential database connection issues or query execution issues
                Console.WriteLine($"Hiba történt a lekérdezés során: {ex.Message}");
                return new List<PontokModel>(); // Return an empty list in case of error
            }
        }
    }
}
