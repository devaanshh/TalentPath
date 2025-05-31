export const getRecommendations = async (formData) => {
  const response = await fetch("http://127.0.0.1:8000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      skills: formData.skills.split(',').map(s => s.trim()),
      interests: formData.interests.split(',').map(i => i.trim()),
      availability: formData.availability,
      preferred_project_type: formData.preferredProjectType
    })
  });

  const data = await response.json();
  return data.recommended_projects;
};
