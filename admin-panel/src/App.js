import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './Pages/LogIn/LogIn';
function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path='/' exact element={<LogIn/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
