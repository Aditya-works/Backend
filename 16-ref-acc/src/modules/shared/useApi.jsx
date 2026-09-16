import axios from "axios"
import { useAuthContext } from "../auth/context/AuthProvider"

export default function useApi(){
    const authContext = useAuthContext()

    const api = axios.create({
        baseURL: "http://localhost:5173/api",
        withCredentials: true
    })

// config is nothing its just the carrier in which headers travelling imagine like this.
    api.interceptors.request.use(config=>{
        config.headers.Authorization = `Bearer ${authContext.accessToken}`
        return config
    
    })

    api.interceptors.response.use(
        response => response,
        async (error)=>{
            if(error.response && error.response.status ===401){
                const res = await axios.post("/api/auth/refresh")
                authContext.setAccessToken(res.data.accessToken)
                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`
                return axios(error.config) // config tells everythig abt the req.
            }
            return Promise.reject(error)
        }
    )

    return api
}