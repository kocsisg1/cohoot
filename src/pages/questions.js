import { useState, useEffect, useCallback } from 'react';
import { GetUsedId } from '../services/auth';

// Reusable Quiz Component
export const Quiz = ({ category, categoryId }) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setcorrectAnswers] = useState(0);


  // Fetch quiz questions based on category
  const fetchQuiz = useCallback(() => {
    fetch(`https://localhost:44331/api/Quiz/Get${category}`)
      .then(response => response.json())
      .then(data => {
        console.log("Backend válasz:", data);
        if (data.message === "end") {
          console.log("Quiz vége! Ennyi lett jó papa", correctAnswers);
          resetQuiz();
        } else {
          setQuiz(data);
          setSelectedAnswer(null); // Reset selected answer
          setIsCorrect(null); // Reset correctness state
        }
      })
      .catch(error => console.error('Hiba a quiz betöltésekor:', error));
  }, [category]);

  // Reset quiz
  const resetQuiz = useCallback(() => {
    fetch('https://localhost:44331/api/Quiz/reset', { method: 'POST' })
      .then(() => {
        console.log('Quiz resetelve, újraindítás...');
        fetchQuiz();
      })
      .catch(error => console.error('Hiba a quiz resetelésekor:', error));
  }, [fetchQuiz]);

  // Fetch the quiz questions when the component mounts
  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleClick = (param) => () => {
    if (selectedAnswer == null) {
      setSelectedAnswer(param);
      const correct = quiz.helyes === param;
      setIsCorrect(correct);

      if (correct) {
        console.log("jó", correctAnswers);
        
        setcorrectAnswers(correctAnswers + 1);
        fetch("https://localhost:44331/api/Point", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: GetUsedId(), pontok: 50, kategoria: categoryId }),
        });
      }

      setTimeout(() => {
        fetchQuiz();
      }, 1000); // Wait for 1 second before loading next question
    }
  };

  if (!quiz) return <div>Loading...</div>;

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