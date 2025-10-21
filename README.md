# FitTrack - Full Stack Fitness Application

A full-stack web application built with React frontend and Django REST Framework backend for tracking BMI and workout routines.

## Features

### BMI Calculator
- Calculate BMI using height (cm) and weight (kg)
- Display BMI category (Underweight, Normal, Overweight, Obese)
- Responsive form with validation

### Workout Tracker
- Full CRUD operations for workout management
- Filter workouts by muscle group (Arms, Legs, Chest, Back, Abs)
- Track sets, reps, and optional notes
- Real-time success/error alerts

## Project Structure

```
fittrack-backend/
├── fittrack/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── workouts/
│   ├── __init__.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── manage.py
└── requirements.txt

fittrack-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── WorkoutForm.jsx
│   │   ├── WorkoutList.jsx
│   │   └── FilterBar.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── BMICalculator.jsx
│   │   └── WorkoutTracker.jsx
│   ├── App.js
│   └── index.js
└── package.json
```

## Setup Instructions

### Backend Setup (Django)

1. Navigate to backend directory:
```bash
cd fittrack-backend
```

2. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create superuser (optional):
```bash
python manage.py createsuperuser
```

6. Start Django server:
```bash
python manage.py runserver
```

Backend will run on: http://127.0.0.1:8000/

### Frontend Setup (React)

1. Navigate to frontend directory:
```bash
cd fittrack-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start React development server:
```bash
npm start
```

Frontend will run on: http://localhost:3000/

## API Endpoints

- `GET /api/workouts/` - List all workouts
- `POST /api/workouts/` - Create new workout
- `GET /api/workouts/{id}/` - Get specific workout
- `PUT /api/workouts/{id}/` - Update workout
- `DELETE /api/workouts/{id}/` - Delete workout

## Technologies Used

### Backend
- Django 4.2.7
- Django REST Framework 3.14.0
- django-cors-headers 4.3.1
- SQLite database

### Frontend
- React 18.2.0
- React Router DOM 6.8.1
- Axios 1.3.4
- Bootstrap 5.2.3

## Usage

1. Start both servers (backend on port 8000, frontend on port 3000)
2. Navigate to http://localhost:3000/
3. Use the BMI Calculator to calculate your Body Mass Index
4. Use the Workout Tracker to manage your fitness routines
5. Filter workouts by muscle group and perform CRUD operations

## Development Notes

- CORS is configured to allow requests from localhost:3000
- Backend uses SQLite for development (easily switchable to PostgreSQL/MySQL)
- Frontend uses Bootstrap for responsive styling
- All API calls include error handling with user feedback