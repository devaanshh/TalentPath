import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import RecommendationForm from "./components/RecommendationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/recommend" element={<RecommendationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
