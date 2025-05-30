# save_models.py

import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

# ✅ Load your dataset
df = pd.read_csv("backend/skillmatch_user_data.csv")

# ✅ Combine relevant text fields into a single string for each entry
corpus = (
    df["Skills"].fillna("") + " " +
    df["Interests"].fillna("") + " " +
    df["Availability"].fillna("") + " " +
    df["PreferredProjectType"].fillna("")
)

# ✅ Fit TF-IDF vectorizer
vectorizer = TfidfVectorizer()
project_vectors = vectorizer.fit_transform(corpus)

# ✅ Save models to backend/models/
with open("backend/models/tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

with open("backend/models/project_vectors.pkl", "wb") as f:
    pickle.dump(project_vectors, f)

print("✅ Models saved successfully!")
