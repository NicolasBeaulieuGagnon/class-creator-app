import React from "react";
import { GlobalStyles } from "./components/GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <Router>
      <div>
        <GlobalStyles />
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
