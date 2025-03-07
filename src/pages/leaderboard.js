import './leaderboard.css';
import React, { useEffect, useState } from "react";
import {useResetQuiz} from './quiz.js';
const Ranking = () => {
  const [currentView, setCurrentView] = useState("main"); // "main" = toplista, "foldrajz" = földrajz ranglista
  const resetQuiz = useResetQuiz();  
  
    useEffect(() => {
      resetQuiz();  
    }, [resetQuiz]);  
  if (currentView === "foldrajz") {
    return <FoldrajzRanking onBack={() => setCurrentView("main")} />;
  }
  if (currentView === "matematika") {
    return <MatematikaRanking onBack={() => setCurrentView("main")} />;
  }
  if (currentView === "film") {
    return <FilmRanking onBack={() => setCurrentView("main")} />;
  }
  if (currentView === "tortenelem") {
    return <TortenelemRanking onBack={() => setCurrentView("main")} />;
  }

  

  return (
    <div className="mainpagecontent">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="quiz-container">
        <div className="quiz-card">
          <h2 className="quiz-question">Toplisták</h2>
          <div className="answers-grid">
            <button className="answer-card" id="foldrajzgomb" onClick={() => setCurrentView("foldrajz")}>
              Földrajz
            </button>
            <button className="answer-card" id="matematikagomb" onClick={() => setCurrentView("matematika")}>Matematika</button>
            <button className="answer-card" id="filmgomb" onClick={() => setCurrentView("film")}>Film</button>
            <button className="answer-card" id="tortenelemgomb" onClick={() => setCurrentView("tortenelem")}>Történelem</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function FoldrajzRanking({ onBack }) {
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
          <h1 className="ranking-title">Földrajz Toplista</h1>
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
          <button className="answer-card" onClick={onBack}>Vissza</button>
        </div>
      </div>
    </div>
  );
}

function MatematikaRanking({ onBack }) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:44331/api/Ranking/Matematika")
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
          <h1 className="ranking-title">Matematika Toplista</h1>
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
          <button className="answer-card" onClick={onBack}>Vissza</button>
        </div>
      </div>
    </div>
  );
}

function FilmRanking({ onBack }) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:44331/api/Ranking/Film")
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
          <h1 className="ranking-title">Film Toplista</h1>
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
          <button className="answer-card" onClick={onBack}>Vissza</button>
        </div>
      </div>
    </div>
  );
}

function TortenelemRanking({ onBack }) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:44331/api/Ranking/Tortenelem")
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
          <h1 className="ranking-title">Történelem Toplista</h1>
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
          <button className="answer-card" onClick={onBack}>Vissza</button>
        </div>
      </div>
    </div>
  );
}

export default Ranking;