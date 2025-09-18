my vercel link :https://student-dashboard-beryl-six.vercel.app

📊 Student Cognitive Skills Dashboard
Project Overview

This project analyzes students’ cognitive skills, predicts their assessment scores, and clusters them into **learning personas**. It includes a **Next.js dashboard** to visualize student performance, cognitive metrics, and clusters.

Features include:

* **Synthetic student dataset** generation with cognitive metrics
* **Feature engineering** for richer insights (`learning_efficiency`, `concentration_synergy`, etc.)
* **Machine Learning** models: Random Forest & XGBoost for predicting assessment scores
* **Clustering** students into learning personas using KMeans
* **Visualizations**: Bar charts, scatter plots, and radar charts
* **Dashboard**: Interactive tables and charts using Next.js

---

📝 Dataset

The dataset contains 500 synthetic students with features such as:

* `student_id`, `name`, `class`
* Cognitive skills: `comprehension`, `attention`, `focus`, `retention`
* `engagement_time` (minutes)
* Derived features: `concentration_synergy`, `learning_efficiency`, `understand_and_retain`
* Target: `assessment_score`
* ML prediction: `predicted_score`
* Cluster label: `learning_persona` (0, 1, 2)

The enriched dataset is saved as `students_results.csv`.

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
also install recharts if there is error 
Open [http://localhost:3000](http://localhost:3000) to see the dashboard.
Edit `app/page.tsx` to start customizing.

---

## 💻 Project Workflow

1. **Generate synthetic student data** using `Faker` and random distributions
2. **Feature engineering** to compute cognitive metrics
3. **Define assessment score** using weighted combination of features
4. **Train ML models** (Random Forest & XGBoost) to predict scores
5. **Predict scores for the entire dataset**
6. **Cluster students** using KMeans to identify learning personas
7. **Visualize results** with feature importance and predicted vs actual scatter plots
8. **Dashboard integration** using Next.js

---

## 📊 Dashboard Features

* **Student Table**: Searchable & sortable
* **Overview Stats**: Average scores, engagement, cognitive metrics
* **Charts**:

  * Bar chart: Feature importance
  * Scatter plot: Attention vs performance
  * Radar chart: Individual student profile
* **Insights Panel**: Compare clusters & learning personas

---

## 🔧 Running ML Scripts

```bash
python student_cognitive_analysis.py
```

Outputs:

* `students_results.csv`
* Feature importance chart
* Predicted vs actual scatter plot

---

## ⚡ Future Enhancements

* Use **real-world student data**
* Add **personalized learning recommendations**
* Track **time-series engagement improvements**
* Integrate **interactive charts** in Next.js dashboard


