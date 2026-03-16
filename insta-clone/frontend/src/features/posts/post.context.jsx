import { createContext } from "react";
import { useState } from "react";
import React from "react";

export const postContext = createContext();

export const PostContextProvider = ({children})=>{
    
    const [loading, setloading] = useState(false);
    const [post, setpost] = useState(null)
    const [feed, setfeed] = useState(null)


    return (
        <postContext.Provider value={{loading , setloading,post,setpost, setfeed, feed}}>
        {children}
    </postContext.Provider>)
}