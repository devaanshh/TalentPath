from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from backend.recommender import recommend_projects
from backend.database import save_recommendation

app = FastAPI()

# 🔓 Enable CORS so frontend can communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Input data schema
class RecommendationRequest(BaseModel):
    Skills: List[str]
    Interests: List[str]
    Availability: str
    PreferredProjectType: str

# 📬 POST endpoint to receive recommendation request
@app.post("/recommend")
def get_recommendation(request: RecommendationRequest):
    recommended_projects = recommend_projects(
        skills=request.Skills,
        interests=request.Interests,
        availability=request.Availability,
        preferred_project_type=request.PreferredProjectType,
        top_k=5
    )

    # 💾 Save to database
    save_recommendation(
        {
            "Skills": request.Skills,
            "Interests": request.Interests,
            "Availability": request.Availability,
            "PreferredProjectType": request.PreferredProjectType,
        },
        recommended_projects
    )

    return {"recommended_projects": recommended_projects}
