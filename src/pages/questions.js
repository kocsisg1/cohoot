import { useState, useEffect, useCallback } from 'react';
import { GetUsedId } from '../services/auth';

export const useResetQuiz = () => {
  const resetQuiz = useCallback(() => {
    fetch('https://localhost:44331/api/Quiz/reset', { method: 'POST' })
      .then(() => {
        console.log('Quiz resetelve');
      })
      .catch(error => console.error('Hiba a quiz resetelésekor:', error));
  }, []);

  return resetQuiz;
};

// Reusable Quiz Component
export const Quiz = ({ category, categoryId }) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setcorrectAnswers] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Fetch quiz questions based on category
  const fetchQuiz = useCallback((currentCorrectAnswers) => {
    fetch(`https://localhost:44331/api/Quiz/Get${category}`)
      .then(response => response.json())
      .then(data => {
        console.log("Backend válasz:", data);
        if (data.message === "end") {
          console.log("Quiz vége! Ennyi lett jó papa", currentCorrectAnswers);
          
          const score = currentCorrectAnswers * 50;
          setFinalScore(score);
          setQuizEnded(true);
  
          fetch("https://localhost:44331/api/Point", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: GetUsedId(), pontok: score, kategoria: categoryId }),
          }).catch(error => console.error('Hiba a pontok mentésekor:', error));
  
          return; // ⬅️ Itt kilépünk, hogy ne fusson le a setQuiz(data)
        }
  
        setQuiz(data);
        setSelectedAnswer(null);
        setIsCorrect(null);
      })
      .catch(error => console.error('Hiba a quiz betöltésekor:', error));
  }, [category, categoryId]);
  

  // Reset quiz
  const resetQuiz = useCallback(() => {
    fetch('https://localhost:44331/api/Quiz/reset', { method: 'POST' })
      .then(() => {
        console.log('Quiz resetelve, újraindítás...');
        setQuizEnded(false);
        setcorrectAnswers(0); // Visszaállítjuk a helyes válaszok számát
        setFinalScore(0);
        fetchQuiz(0);
      })
      .catch(error => console.error('Hiba a quiz resetelésekor:', error));
  }, []);

  // Fetch the quiz questions when the component mounts
  useEffect(() => {
    fetchQuiz(correctAnswers);
  }, []);

  const handleClick = (param) => () => {
    if (selectedAnswer == null) {
      setSelectedAnswer(param);
      const correct = quiz.helyes === param;
      setIsCorrect(correct);

      if (correct) {
        setcorrectAnswers(prevCorrectAnswers => {
          const newCorrectAnswers = prevCorrectAnswers + 1;
          console.log("jó", newCorrectAnswers);
          setTimeout(() => {
            fetchQuiz(newCorrectAnswers);
          }, 1000); // Wait for 1 second before loading next question
          return newCorrectAnswers;
        });
      } else {
        setTimeout(() => {
          fetchQuiz(correctAnswers);
        }, 1000); // Wait for 1 second before loading next question
      }
    }
  };

  if (!quiz) return <div>Loading...</div>;

  if (quizEnded) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2 className="quiz-question">Quiz vége</h2>
          <div className="answers-grid">
          <h3 className="quiz-question">Helyes válaszok: {correctAnswers}</h3>
          <h3 className="quiz-question"> Összesen szerzett pontok: {finalScore}</h3>
          <button className="answer-card" onClick={resetQuiz}>Újraindítás</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mainpagecontent">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      
      <div className="quiz-container">
        <div className="quiz-card">
          <h2 className="quiz-question" id="kerdes">{quiz.kerdes}</h2>
          <div className="answers-grid">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={handleClick(num)}
                className="answer-card"
                id={`gomb${num}`}
                style={{
                  backgroundColor: selectedAnswer === num
                    ? (isCorrect ? 'lightgreen' : 'red')
                    : ''
                }}
              >
                {quiz[`valasz${num}`]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};