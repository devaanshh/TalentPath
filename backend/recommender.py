import os
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")  # updated path

with open(os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)

with open(os.path.join(MODEL_DIR, "project_vectors.pkl"), "rb") as f:
    project_vectors = pickle.load(f)

df = pd.read_csv(os.path.join(BASE_DIR, "skillmatch_user_data.csv"), encoding="latin1")
df.columns = df.columns.str.strip()

def recommend_projects(skills, interests, availability, preferred_project_type, top_k=5):
    user_input = (
        " ".join(skills) + " " +
        " ".join(interests) + " " +
        availability + " " +
        preferred_project_type
    )

    user_vec = vectorizer.transform([user_input])
    similarities = cosine_similarity(user_vec, project_vectors).flatten()
    top_indices = similarities.argsort()[::-1]  # Sort descending by similarity

    recommended = []
    seen = set()
    
    for idx in top_indices:
        project_name = df.iloc[idx]["SuggestedProject"]
        if project_name not in seen:
            seen.add(project_name)
            recommended.append(project_name)
            if len(recommended) == top_k:
                break

    return recommended
