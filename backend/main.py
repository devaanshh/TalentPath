from fastapi import FastAPI
from backend.schemas import UserData, ProjectRecommendation
from backend.recommender import recommend_projects
from backend.database import save_user_data

app = FastAPI()

@app.post("/recommend", response_model=ProjectRecommendation)
def get_recommendation(user_data: UserData):
    user_dict = user_data.dict(by_alias=True)

    recommendations = recommend_projects(
        skills=user_dict["Skills"],
        interests=user_dict["Interests"],
        availability=user_dict["Availability"],
        preferred_project_type=user_dict["PreferredProjectType"]
    )

    # Save to DB
    save_user_data(user_dict, recommendations)

    return {"recommended_projects": recommendations}
