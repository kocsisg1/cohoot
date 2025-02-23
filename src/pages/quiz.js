import './quiz.css';
import { useState, useEffect } from 'react';

export default function Quiz(){

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
    <div class="mainpagecontent">
        <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
        
        <div class="quiz-container">
            <div class="quiz-card">
            <h2 class="quiz-question" id="kerdes">{quiz.kerdes}</h2>
            <div class="answers-grid">
                <button onClick={handleClick(1)} class="answer-card" id="agomb">{quiz.valasz1}</button>
                <button onClick={handleClick(2)} class="answer-card" id="bgomb">{quiz.valasz2}</button>
                <button onClick={handleClick(3)} class="answer-card" id="cgomb">{quiz.valasz3}</button>
                <button onClick={handleClick(4)} class="answer-card" id="dgomb">{quiz.valasz4}</button>
            </div>
            </div>
        </div>
    </div>
    )
}