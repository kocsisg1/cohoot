import './quiz.css';
import { useState, useEffect } from 'react';

export const Quiz =()=>{

    const [quiz, setQuiz] = useState(null);
  
    useEffect(() => {
        fetch(`https://localhost:44331/api/Quiz`)
        .then(response => response.json())
        .then(data => setQuiz(data))
        .catch(error => console.error('Hiba a quiz betöltésekor:', error));
    }, []);

    const handleClick = param => e => {
        if(quiz.helyes === param){
            console.log("gearbá");
            
        }
        fetch(`https://localhost:44331/api/Quiz`)
        .then(response => response.json())
        .then(data => setQuiz(data))
        .catch(error => console.error('Hiba a quiz betöltésekor:', error));

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
                <button onClick={handleClick(1)} className="answer-card" id="agomb">{quiz.valasz1}</button>
                <button onClick={handleClick(2)} className="answer-card" id="bgomb">{quiz.valasz2}</button>
                <button onClick={handleClick(3)} className="answer-card" id="cgomb">{quiz.valasz3}</button>
                <button onClick={handleClick(4)} className="answer-card" id="dgomb">{quiz.valasz4}</button>
            </div>
            </div>
        </div>
    </div>
    )
}