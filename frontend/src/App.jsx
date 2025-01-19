import { useState } from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";


import Login from "./components/Login";

import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "./pages/UserPage";


import Stories from "./components/StoriesPage";





function App() {
  

  return (
    
      <div>
      <Router>
        <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/user' element={<UserPage/>}/>
        
        <Route path='/stories' element={<Stories/>}/>
        </Routes>
        </Router>
      </div>
      
    
  );
}

export default App
