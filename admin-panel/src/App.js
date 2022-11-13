import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './Pages/LogIn/LogIn';
import Home from './Pages/Home/Home';
import Locals from './Pages/Users/Locals';
import Foreigners from './Pages/Users/Foreigners';
import LocalStatistics from './Pages/Statistics/LocalStatistics';
import ForeignerStatistics from './Pages/Statistics/ForeignerStatistics';
function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path='/' exact element={<LogIn/>} />
          <Route path='/home' exact element={<Home/>} />
          <Route path='/locals' exact element={<Locals/>} />
          <Route path='/foreigners' exact element={<Foreigners/>} />
          <Route path='/locals-statistics' exact element={<LocalStatistics/>} />
          <Route path='/foreigners-statistics' exact element={<ForeignerStatistics/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
