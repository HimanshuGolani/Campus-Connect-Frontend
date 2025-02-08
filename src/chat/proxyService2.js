import axios from 'axios';

const proxyService2 = axios.create({
    baseURL: 'ws://localhost:8080',
})

export default proxyService2;