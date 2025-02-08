import axios from 'axios';

const proxyService1 = axios.create({
  baseURL: 'http://localhost:8085/', // Replace with your actual proxy server URL
});

export default proxyService1;