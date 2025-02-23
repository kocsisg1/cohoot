import './leaderboard.css';

import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:44331/api/Ranking")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPlayers(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="mainpagecontent">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="ranking">
        <div className="ranking-container">
          <h1 className="ranking-title">Toplista</h1>
          {error ? (
            <p className="error-message">Hiba történt: {error}</p>
          ) : (
            <div className="ranking-list" id="ranglista">
              {players.map((player, index) => (
                <div key={index} className="ranking-item">
                  <span className="rank">{index + 1}.</span>
                  <span className="name">{player.userName}</span>
                  <span className="score">{player.points} pont</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;