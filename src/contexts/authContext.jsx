import { createContext, useEffect, useState } from "react";
import { getLoggedInUserApi } from "../services/authServices";



export const authContext=createContext()

export default function AuthContextProvider({children}){
const[isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem('token')!=null)
const[userData,setUserData]=useState(null)
async function getUserData() {
    const response=await getLoggedInUserApi()
    if(response.message=='success'){
        setUserData(response.user)
    }
}

useEffect(()=>{
    if(isLoggedIn){
getUserData()
}else{setUserData(null)}
},[isLoggedIn])

    return <authContext.Provider value={{isLoggedIn,setIsLoggedIn,userData,setUserData}}>
{children}
    </authContext.Provider>
}