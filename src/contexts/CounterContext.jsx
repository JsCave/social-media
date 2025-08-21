import {createContext, useContext,useState} from "react";

export const counterContext=createContext()
export default function CounterContextProvider({children}){
    const [counter,setCounter]=useState(10)


    return
        <CounterContext.Provider value={{counter,setCounter}}>
{children}
        </CounterContext.Provider>

    
}

