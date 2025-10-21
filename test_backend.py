import requests

# Test if backend is responding
try:
    response = requests.get('https://fittrack-backend-k3my.onrender.com/')
    print(f"Root endpoint status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

# Test auth endpoints
try:
    response = requests.post('https://fittrack-backend-k3my.onrender.com/api/auth/register/', 
                           json={'username': 'test', 'password': 'test123'})
    print(f"Register status: {response.status_code}")
    print(f"Register response: {response.text}")
except Exception as e:
    print(f"Register error: {e}")