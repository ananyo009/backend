import React from 'react'
import '../styles/form.scss'
import { Link } from 'react-router';
import axios from 'axios'
import { useState } from 'react';
import Authuse from '../hooks/userAuth'

const Register = () => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
  const { handleRegister, loading } = Authuse()
  

    async function handleSubmit(e) {
      e.preventDefault();
      
      if (loading) {
        return (
          <main>
            <h1>Loading...</h1>
          </main>
        )
      }

      handleRegister(email, username, password).then(res => {
          console.log(res)
      })
      

      
    }

  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            onInput={(e) => {
              setemail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="enter email"
          />
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="enter username"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="enter password"
          />
          <button type="submit" className='button primary'>Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggle-form" to="/login">
            login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register