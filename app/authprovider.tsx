import { useEffect } from "react";
import { getToken } from "./auth/lib";

export function AuthProvider({ children } : {children: React.ReactNode}){
    useEffect(()=>{
        let token = getToken() 
        if(token == undefined){
            window.location.replace('/login');
        }
    },[])

    return children;
}