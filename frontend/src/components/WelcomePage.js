import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/recommend");
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to TalentPATH</h1>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default WelcomePage;
