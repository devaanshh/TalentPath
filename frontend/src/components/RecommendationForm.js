import React, { useState } from "react";
import "./RecommendationForm.css";

const RecommendationForm = () => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState("");
  const [availability, setAvailability] = useState("");
  const [preferredProjectType, setPreferredProjectType] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const skillOptions = [
    "Figma", "Django", "Flask", "Python", "TensorFlow", "NodeJS",
    "React", "ML", "Java", "Keras", "AI", "JavaScript", "C++"
  ];

  const interestOptions = [
    "Healthcare", "Climate", "Cybersecurity", "Automation",
    "Social Impact", "Education", "Finance"
  ];

  const availabilityOptions = ["Full-time", "Part-time"];
  const projectTypeOptions = ["Research", "Technical", "Creative"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Skills: skills,
      Interests: [interests],
      Availability: availability,
      PreferredProjectType: preferredProjectType,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setRecommendations(result.recommended_projects);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setSkills((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  return (
    <div className="form-background">
      <div className="glass-box form-container">
        <h2>Get Your Project Recommendations</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Skills:</label>
            <div className="dropdown-box">
              {skillOptions.map((skill) => (
                <label key={skill} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={skills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Interests:</label>
            <div className="dropdown-box">
              {interestOptions.map((interest) => (
                <label key={interest} className="radio-item">
                  <input
                    type="radio"
                    name="interests"
                    value={interest}
                    checked={interests === interest}
                    onChange={(e) => setInterests(e.target.value)}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Availability:</label>
            <div className="dropdown-box">
              {availabilityOptions.map((option) => (
                <label key={option} className="radio-item">
                  <input
                    type="radio"
                    name="availability"
                    value={option}
                    checked={availability === option}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Project Type:</label>
            <div className="dropdown-box">
              {projectTypeOptions.map((option) => (
                <label key={option} className="radio-item">
                  <input
                    type="radio"
                    name="projectType"
                    value={option}
                    checked={preferredProjectType === option}
                    onChange={(e) => setPreferredProjectType(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button className="submit-button" type="submit">
            Get Recommendations
          </button>
        </form>

        <div className="recommendations">
          <h3>Recommended Projects:</h3>
          <ul>
            {recommendations.map((project, index) => (
              <li key={index} className="recommendation-box">
                {project}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecommendationForm;
