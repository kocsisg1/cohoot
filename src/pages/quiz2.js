import { Quiz } from './questions';
import './quiz.css';
import { useState } from 'react';
 // Import the reusable Quiz component

export const Themes = () => {
  const [currentView, setCurrentView] = useState("main"); 

  if (currentView === "foldrajz") {
    return <Quiz category="Foldrajz" categoryId={0} />;
  }
  if (currentView === "matematika") {
    return <Quiz category="Matematika" categoryId={1} />;
  }
  if (currentView === "film") {
    return <Quiz category="Film" categoryId={2} />;
  }
  if (currentView === "tortenelem") {
    return <Quiz category="Tortenelem" categoryId={3} />;
  }

  return (
    <div className="mainpagecontent">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="quiz-container">
        <div className="quiz-card">
          <h2 className="quiz-question">Témák</h2>
          <div className="answers-grid">
            <button className="answer-card" id="foldrajzgomb" onClick={() => setCurrentView("foldrajz")}>Földrajz</button>
            <button className="answer-card" id="matematikagomb" onClick={() => setCurrentView("matematika")}>Matematika</button>
            <button className="answer-card" id="filmgomb" onClick={() => setCurrentView("film")}>Film</button>
            <button className="answer-card" id="tortenelemgomb" onClick={() => setCurrentView("tortenelem")}>Történelem</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;