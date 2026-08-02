# LeafGuard

![LeafGuard Banner](frontend/public/Screenshot%202026-08-01%20225005.png)

LeafGuard is an AI-powered web application that helps identify plant diseases from leaf images. Users can upload a photo of a plant leaf and receive an instant diagnosis, confidence score, weather-based disease risk assessment, treatment recommendations, and a downloadable PDF report.

**Live Demo:** https://leaf-guard-ai-orcin.vercel.app/

---

## Features

- AI-powered plant disease detection
- Supports 30+ plant disease classes
- Confidence score for each prediction
- Weather-based disease risk assessment
- Practical treatment and prevention recommendations
- Downloadable PDF diagnosis report
- Modern and responsive user interface
- End-to-end deployment with React, FastAPI, and PyTorch

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Framer Motion

### Backend

- FastAPI
- Python
- Uvicorn

### Machine Learning

- PyTorch
- EfficientNet-B0
- Scikit-learn
- OpenCV
- Pillow

### Deployment

- Vercel
- Render

---

## Project Structure

```
LeafGuard-AI/
│
├── frontend/          # React frontend
├── backend/
│   ├── app/           # FastAPI application
│   ├── ml/            # Model utilities
│   ├── models/        # Trained model weights
│   └── data/          # Disease information
│
├── README.md
└── .gitignore
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sarthak743/LeafGuard-AI.git
cd LeafGuard-AI
```

---

### 2. Backend Setup

```bash
cd backend
```

Create a virtual environment.

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start the backend server.

```bash
uvicorn app.main:app --reload
```

The backend will run on

```
http://localhost:8000
```

---

### 3. Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend.

```bash
npm run dev
```

The frontend will run on

```
http://localhost:5173
```

---

## How It Works

1. Upload a clear image of a plant leaf.
2. The image is sent to the FastAPI backend.
3. The trained EfficientNet-B0 model predicts the disease.
4. Weather conditions are analyzed to estimate disease spread risk.
5. Treatment and prevention recommendations are generated.
6. A downloadable PDF report is created for the user.

---

## Why LeafGuard?

Plant diseases can significantly reduce crop yield if not identified early. LeafGuard aims to make disease diagnosis faster and more accessible by combining computer vision with weather-aware recommendations.

The application provides:

- Early disease identification
- AI-assisted diagnosis
- Practical treatment guidance
- Weather-based risk analysis
- Easily shareable PDF reports

---

## Future Improvements

- Support for additional crop species
- Multi-language support
- User accounts and diagnosis history
- Image segmentation for infected regions
- Mobile application
- Offline inference support

---

## License

This project is licensed under the MIT License.

---

## Author

**Sarthak Brid**

GitHub: https://github.com/sarthak743

LinkedIn: https://www.linkedin.com/in/sarthakbrid/
