FROM python:3.9-slim

WORKDIR /app

COPY fittrack-backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "python fittrack-backend/manage.py migrate && gunicorn --chdir fittrack-backend fittrack.wsgi --bind 0.0.0.0:8000"]