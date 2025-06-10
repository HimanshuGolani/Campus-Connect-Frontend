import axios from 'axios';

const proxyService1 = axios.create({
  baseURL: 'http://localhost:8000/', 
  // baseURL: 'https://campusconnnectchatbackend.onrender.com/',
});

export default proxyService1;