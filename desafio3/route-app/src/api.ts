import axios from 'axios';

export const api = axios.create({ baseURL: 'http://desafio3-api-service:3000' });
