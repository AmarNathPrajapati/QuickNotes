import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";
export const api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})