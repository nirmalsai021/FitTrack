const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://fittrack-wwr7.onrender.com/api'
    : 'http://127.0.0.1:8000/api'
};

export default config;