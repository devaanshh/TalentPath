import React, { useState } from "react";
import axios from "axios";
import "./RecommendationForm.css";

const SKILLS = [
  "Figma", "Django", "Flask", "Python", "TensorFlow", "NodeJS",
  "React", "ML", "Java", "Keras", "AI", "JavaScript", "C++"
];

const INTERESTS = [
  "Healthcare", "Climate", "Cybersecurity", "Automation",
  "Social Impact", "Education", "Finance"
];

const AVAILABILITY = ["Full-time", "Part-time"];

const PROJECT_TYPES = ["Research", "Technical", "Creative"];

const RecommendationForm = () => {
  const [skills, setSkills] = useState([]);
  const [interest, setInterest] = useState("");
  const [availability, setAvailability] = useState("");
  const [preferredProjectType, setPreferredProjectType] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!interest || !availability || !preferredProjectType) {
      alert("Please select all options before submitting.");
      return;
    }

    const data = {
      Skills: skills,
      Interests: [interest],
      Availability: availability,
      PreferredProjectType: preferredProjectType,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/recommend", data);
      setRecommendations(response.data.recommended_projects);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations. Try again later.");
    }
  };

  return (
    <div className="form-container">
      <h2>TalentPath – Get Project Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Skills (multiple select)</legend>
          <div className="skills-grid">
            {SKILLS.map((skill) => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Interests (single select)</legend>
          <div className="radio-group">
            {INTERESTS.map((interestOption) => (
              <label key={interestOption} className="radio-label">
                <input
                  type="radio"
                  name="interest"
                  value={interestOption}
                  checked={interest === interestOption}
                  onChange={() => setInterest(interestOption)}
                />
                {interestOption}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Availability (single select)</legend>
          <div className="radio-group">
            {AVAILABILITY.map((availOption) => (
              <label key={availOption} className="radio-label">
                <input
                  type="radio"
                  name="availability"
                  value={availOption}
                  checked={availability === availOption}
                  onChange={() => setAvailability(availOption)}
                />
                {availOption}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Preferred Project Type (single select)</legend>
          <div className="radio-group">
            {PROJECT_TYPES.map((projType) => (
              <label key={projType} className="radio-label">
                <input
                  type="radio"
                  name="projectType"
                  value={projType}
                  checked={preferredProjectType === projType}
                  onChange={() => setPreferredProjectType(projType)}
                />
                {projType}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Get Recommendations</button>
      </form>

      <div className="recommendations">
        <h3>Recommended Projects:</h3>
        {recommendations.length === 0 ? (
          <p>No recommendations yet. Submit the form above.</p>
        ) : (
          <div className="recommendation-grid">
            {recommendations.map((project, idx) => (
              <div key={idx} className="recommendation-box">
                {project}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationForm;
