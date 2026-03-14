import axios from 'axios'

//Responsible for communication with backend

let api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials:true
})

export async function register(email, username, password) {
    try {
        const response = await api.post("/register", {
            email,
            username,
            password
        })

        return response.data

    } catch (err) {
        throw err
    } 

}

export async function login(username, password) {
    try {
        const response = await api.post("/login", {
            username,
            password
        })

        return response.data
    }
    catch (err) {
        throw err
    }
}

export async function getMe() {
    try {
        const response = api.get("/get-me")

        return response.data
    } catch (err) {
        throw err
    }
}