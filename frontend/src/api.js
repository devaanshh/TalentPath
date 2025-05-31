const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getRecommendations = async (formData) => {
  const response = await fetch(BASE_URL, {
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
