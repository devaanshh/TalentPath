from pymongo import MongoClient
from dotenv import load_dotenv
import os

mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client["talentpathDB"]
collection = db["recommendations"]

def save_recommendation(user_data: dict, recommended_projects: list):
    document = {
        **user_data,
        "recommended_projects": recommended_projects
    }
    collection.insert_one(document)
