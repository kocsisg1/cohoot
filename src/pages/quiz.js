import './quiz.css';
import { useState, useEffect, useCallback } from 'react';


const Themes = () => {
  const [currentView, setCurrentView] = useState("main"); 

  if (currentView === "foldrajz") {
    return <FoldrajzQuiz />;
  }
  if (currentView === "matematika") {
    return <MatematikaQuiz />;
  }
  if (currentView === "film") {
    return <FilmQuiz />;
  }
  if (currentView === "tortenelem") {
    return <TortenelemQuiz />;
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


function FoldrajzQuiz() {
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

function MatematikaQuiz() {
    const [quiz, setQuiz] = useState(null);

    const fetchQuiz = useCallback(() => {
        fetch(`https://localhost:44331/api/Quiz/GetMatematika`)
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

function FilmQuiz() {
    const [quiz, setQuiz] = useState(null);

    const fetchQuiz = useCallback(() => {
        fetch(`https://localhost:44331/api/Quiz/GetFilm`)
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

function TortenelemQuiz() {
    const [quiz, setQuiz] = useState(null);

    const fetchQuiz = useCallback(() => {
        fetch(`https://localhost:44331/api/Quiz/GetTortenelem`)
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

export default Themes;