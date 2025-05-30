from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["talentpathDB"]
collection = db["recommendations"]

def save_user_data(user_data: dict, recommended_projects: list):
    document = {
        **user_data,
        "recommended_projects": recommended_projects
    }
    collection.insert_one(document)
