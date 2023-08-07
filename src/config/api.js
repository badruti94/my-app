import axios from "axios";

export const API = axios.create({
        // baseURL: "http://localhost:3000/",
        baseURL: "https://my-app-be.vercel.app/",
})

export const getConfig = async () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }

    return config
}