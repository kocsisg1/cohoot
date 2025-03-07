import React, { useEffect } from 'react';
import './home.css';
import {useResetQuiz} from './quiz.js';
export default function Home(){
    const resetQuiz = useResetQuiz();  

  useEffect(() => {
    resetQuiz();  
  }, [resetQuiz]);  

    return (<div className="mainpagecontent">
       
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <div>
        <h1>Cohoot</h1>
        
        
</div>
</div>)

}