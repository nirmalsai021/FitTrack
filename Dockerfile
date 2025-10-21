FROM python:3.9-slim

WORKDIR /app

COPY fittrack-backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE $PORT

CMD ["sh", "-c", "cd fittrack-backend && python manage.py makemigrations && python manage.py migrate && gunicorn fittrack.wsgi --bind 0.0.0.0:$PORT"]