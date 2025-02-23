import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import Quiz from './pages/quiz';
import Leaderboard from './pages/leaderboard';
import { PrivateRoute } from './services/privateRoute';
//import Authentication from './services/auth.js';

function App() {
  return (
    <BrowserRouter>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <title>Cohoot</title>
      <div class="w3-top">
        <div class="w3-bar w3-card w3-left-align w3-large">
          <a href="./home" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Kezdőlap</a>
          <a href="./quiz" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Quizek</a>
          <a href="./leaderboard" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Toplista</a>
          <a href="./login" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">aaaa</a>
          <a href="./register" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">bbbb</a>
        </div>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
              } />

            <Route path="/quiz" element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
              } />

            <Route path="/leaderboard" element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
              } />
          </Routes>
          </div>

    </BrowserRouter>
  );
}

export default App;
