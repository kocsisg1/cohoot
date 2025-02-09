fetch('https://localhost:44331/api/Ranking')
  .then(response => response.json())  
  .then(data => {
    console.log(data)
    const topPlayers = data


    let rankingList = '';
    topPlayers.forEach((player, index) => {
      rankingList += `
      <div class="ranking-item">
                <span class="rank">${index + 1}.</span>
                <span class="name">${player.felhasznaloNev}</span>
                <span class="score">${player.pont} pont\n</span>
              </div> 
      `;
    });

    document.getElementById("ranglista").innerHTML = rankingList;
  })
  .catch(error => {
    console.error('Hiba történt a fetch kérés során:', error);
  });