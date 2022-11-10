import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './Pages/LogIn/LogIn';
import Home from './Pages/Home/Home';
function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path='/' exact element={<LogIn/>} />
          <Route path='/home' exact element={<Home/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
