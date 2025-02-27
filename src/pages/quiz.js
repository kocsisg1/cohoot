import './quiz.css';
import { useState, useEffect, useCallback } from 'react';

export default function Quiz() {
    const [quiz, setQuiz] = useState(null);

    const fetchQuiz = useCallback(() => {
        fetch(`https://localhost:44331/api/Quiz`)
            .then(response => response.json())
            .then(data => {
                console.log("Backend válasz:", data);
                if (data.message === "end") {
                    console.log("Quiz vége!");
                    resetQuiz();
                } else {
                    setQuiz(data);
                }
            })
            .catch(error => console.error('Hiba a quiz betöltésekor:', error));
    }, []);

    const resetQuiz = useCallback(() => {
        fetch(`https://localhost:44331/api/Quiz/reset`, { method: 'POST' })
            .then(() => {
                console.log("Quiz resetelve, újraindítás...");
                fetchQuiz(); // Közvetlenül újraindítjuk a quiz fetch-t
            })
            .catch(error => console.error('Hiba a quiz resetelésekor:', error));
    }, [fetchQuiz]);

    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    const handleClick = (param) => () => {
        if (quiz.helyes === param) {
            console.log("Helyes válasz!");
        }
        fetchQuiz();
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
    );
}