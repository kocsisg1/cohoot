import { Quiz, useResetQuiz } from './questions';
import './quiz.css';
import { useState } from 'react';
 // Import the reusable Quiz component

export const Themes = () => {
  const [currentView, setCurrentView] = useState("main"); 
  const resetQuiz = useResetQuiz();  

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

  function setQuizView(category){
    resetQuiz();
    setCurrentView(category);
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
            <button className="answer-card" id="foldrajzgomb" onClick={() => setQuizView("foldrajz")}>Földrajz</button>
            <button className="answer-card" id="matematikagomb" onClick={() => setQuizView("matematika")}>Matematika</button>
            <button className="answer-card" id="filmgomb" onClick={() => setQuizView("film")}>Film</button>
            <button className="answer-card" id="tortenelemgomb" onClick={() => setQuizView("tortenelem")}>Történelem</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;