from pydantic import BaseModel, Field
from typing import List

class UserData(BaseModel):
    skills: List[str] = Field(..., alias="Skills")
    interests: List[str] = Field(..., alias="Interests")
    availability: str = Field(..., alias="Availability")
    preferred_project_type: str = Field(..., alias="PreferredProjectType")

    class Config:
        populate_by_name = True


class ProjectRecommendation(BaseModel):
    recommended_projects: List[str] = Field(..., alias="RecommendedProject")

    class Config:
        populate_by_name = True
