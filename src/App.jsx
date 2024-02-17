import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Signup from './components/Authentication/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
     <Router>
                <Routes>
                    <Route path="/" element={<Signup/>}></Route>
                </Routes>
            </Router>
    
    </>
  )
}

export default App
