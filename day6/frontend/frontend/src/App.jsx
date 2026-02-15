import React from 'react'
import { useState } from 'react';
import axios from "axios"

const App = () => {

  const [notes, setnotes] = useState([])

  axios.get("http://localhost:3000/api/notes").then((res) => {
    setnotes(res.data.notes)
  })

  return (
    <div className='notes'>
      {notes.map((note) => {
        return <div className="note">
          <h1>{note.title}</h1>
          <h3>{note.description}</h3>
        </div>
        
      })}
    </div>
  )
}

export default App