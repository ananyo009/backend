import { createContext, useState, useEffect } from "react";

import {register , login } from '../auth/services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({children}) {
    
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)

    const handleLogin = async (username, password) => {
        setloading(true)
        try {
            const response = await login(username, password)
            setuser(response.user)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const handleRegister = async (username, email, password)=>{
        setloading(true);

        try {
            const response = await register(email, username, password)
            setuser(response.user)
        } catch (err) {
            console.log(response.data)
        } finally {
            setloading(false)
        }

    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    )
}