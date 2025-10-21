@echo off
echo Setting up FitTrack Application...

echo.
echo Setting up Backend...
cd fittrack-backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
echo Backend setup complete!

echo.
echo Setting up Frontend...
cd ..\fittrack-frontend
npm install
echo Frontend setup complete!

echo.
echo Setup complete! 
echo.
echo To run the application:
echo 1. Backend: cd fittrack-backend && venv\Scripts\activate && python manage.py runserver
echo 2. Frontend: cd fittrack-frontend && npm start
echo.
pause