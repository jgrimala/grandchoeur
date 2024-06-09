// gcfrontend/src/services/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost/GrandChoeur/gcbackend/public/index.com', // Adjust this URL to your actual backend URL
    withCredentials: true,  // Ensure credentials are included with every request
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosInstance;
