import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="glass-box">
        <h1>
          <strong>Welcome to </strong>
          <em>TalentPATH</em>
        </h1>
        <p>
          TalentPath is a smart project suggestion platform where the user inputs their skills (e.g., Python, React, ML, Figma), chooses interests (e.g., Healthcare, Climate, Cybersecurity), shows availability (Full-time or Part-time), and chooses a preferred project type (Research, Technical, or Creative). The system then suggests to them suitable projects based on their profile and interests.
        </p>
        <button className="next-button" onClick={() => navigate("/recommend")}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
