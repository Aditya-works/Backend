import { createContext } from "react";
import {useState,useContext} from "react"
export const  AuthContext = createContext();

export default function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    return <AuthContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuthcontext must be used within AuthProvider")
    }
    return context;
}