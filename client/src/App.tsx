import React from "react";
import { GlobalStyles } from "./components/GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import CreateLecture from "./components/CreateLecture";
const App = () => {
  return (
    <Router>
      <div>
        <GlobalStyles />
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-lecture" element={<CreateLecture />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
