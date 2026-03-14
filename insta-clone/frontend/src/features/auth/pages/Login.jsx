import React from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import Authuse from '../hooks/userAuth'
import { useNavigate } from 'react-router'

const Login = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const { handleLogin, loading } = Authuse()

    const Navigate = useNavigate()
    
    if (loading) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
            
        )
    }

    async function handlesubmit(e) {
        e.preventDefault();
        
        await handleLogin(username, password).then(res => {
            console.log(res)
        })

        console.log("user logged in")
        
        Navigate("/")
        
    }
  return (
      <main>
          <div className="form-container">
              <h2>Login</h2>
              <form onSubmit={handlesubmit}>
                  <input onInput={(e)=>{setusername(e.target.value)}} type="text" name="username" placeholder='enter username' />
                  <input onInput={(e)=>{setpassword(e.target.value)}} type="password" name="password" placeholder='enter password' />
                  <button type='submit' className='button primary'>Login</button>
              </form>
              <p>Don't have an account? <Link className="toggle-form" to="/register">Register</Link></p>
          </div>
    </main>
  )
}

export default Login