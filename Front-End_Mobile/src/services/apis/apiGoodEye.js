import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000/v1'
})

export default api