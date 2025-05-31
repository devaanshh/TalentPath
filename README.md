# **TalentPath – Smart Project Recommender**

TalentPath is a student project recommendation platform. It assists in recommending users with appropriate projects based on their Skills, Interests, Availability, and Preferred Project type through a Semantic Similarity model.

---

## **Features**

- Multi-select skills input
- Type of Interest, Availability, and Project Type
- Intelligent Recommendations based on ML
- FastAPI backend with MongoDB
- Interactive React frontend
- Dockerized for plug-and-play deployment

---

## **Project Structure**

```

TalentPath/
├── backend/                  # FastAPI backend
│   ├── main.py               # Entry point for FastAPI
│   ├── schemas.py            # Mongo Database schema
│   ├── recommender.py        # ML recommendation logic
│   ├── database.py           # MongoDB connection
│   ├── requirements.txt      # Backend dependencies
|   └── models/               # Cosine Similarity + TF-IDF (ML Models) in .pkl format
|       ├──project_vectors.pkl
|       └──tfidf_vectorizer.pkl
|
├── frontend/                 # React frontend
│   ├── public/
|   ├── .env                  # Environment variables
|   ├── package-lock.json     # Frontend dependencies
│   ├── package.json
│   └── src/
│       ├── components/
|       |    ├── RecommendationForm.js
│       |    ├── WelcomePage.js
|       |    └──...
|       ├── App.js
|       ├── api.js
|       ├── index.js
|       └──...
|       
├── Dockerfile                # Backend Dockerfile
├── docker-compose.yml        # Docker orchestration
├── README.md                 # README file with User manual and Installation Guide
└── save_models.py            # For saving .pkl files

````

---

## **Prerequisites**

- Docker and Docker Compose installed.
- Ports `3000`, `8000`, and `27017` available on your system.

---

## **Quick Start (Plug-and-Play)**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/TalentPath.git
cd TalentPath
````

### 2. Create Environment Variable

Create a `.env` file in the **root** directory with:

```env
MONGO_URI=mongodb://mongo:27017/talentpath
```

### 3. Start All Services

```bash
docker-compose up --build
```

Access:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend (API): [http://localhost:8000/docs](http://localhost:8000/docs)

---

## **User Manual**

### **Step 1**: Open the App
Visit: http://localhost:3000

### **Step 2**: Get Started
Click Next on the Welcome screen.

Enter your details:

* **Skills** – select multiple.

* **Interest** – choose one.

* **Availability** – choose one.

* **Preferred Project Type** – choose one.

Click Get Recommendations.

### **Step 3**: View Results
Your recommended projects will appear in styled boxes based on your inputs.


---

## **How It Works**
TalentPath uses TF-IDF Vectorization and Cosine Similarity to semantically match your inputs against the projects in MongoDB. It finds the best matches and gives you the most suited project suggestions.

---

## **Troubleshooting**

| Issue                  | Solution                                             |
|------------------------|------------------------------------------------------|
| Ports already in use   | Change them in `docker-compose.yml`                 |
| Mongo connection error | Ensure `.env` has correct `MONGO_URI`               |
| App not loading        | Check `docker-compose` logs for errors              |
| Model not loading      | Ensure `.pkl` files are in `backend/models/`        |

---

## **Clean Up**

To stop all services:

```bash
docker-compose down
```

To remove volumes as well:

```bash
docker-compose down -v
```

---

## **Developer Notes**

* Code changes reflect automatically due to Docker volume mounting.
* Backend must contain `main.py` with `app = FastAPI(...)`.
* MongoDB persists through Docker volume: `mongo_data`.

---

# **Enjoy using TalentPath!**
