import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Assignment/Login";
import Signup from "./Assignment/Signup";
import Header from "./Assignment/Header";

function App() {
  return (
    <div>
     <Router>
       
        <Routes>
          <Route path="/" exact  element={<Login/>} />
          <Route path="/register" element={<Signup/>} />
          <Route path="/header" element={<Header/>} />
        </Routes>
      </Router>
      
    </div>
  );
}
export default App;