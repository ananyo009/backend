import React from 'react'
import '../styles/navbar.scss'
import { useNavigate } from 'react-router'

const Navbar = () => {

    const redirect = useNavigate()

  return (
      <div className='navbar'>
          <h2>Snaply</h2>
          <button className='button primary' onClick={() => {
              redirect('/create-post')
          }}>Create Post</button>
    </div>
  )
}

export default Navbar