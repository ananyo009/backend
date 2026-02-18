import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios"

const App = () => {

  const [notes, setnotes] = useState([])

  
  function fetchData() {
    axios.get("https://backend-1-qb7f.onrender.com/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements

    console.log(title.value, description.value)
    
    axios
      .post("https://backend-1-qb7f.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
        e.target.reset();
      });
  }
  
  function noteDelete(noteid) {
    axios
      .delete("https://backend-1-qb7f.onrender.com/api/notes/" + noteid)
      .then((res) => {
        console.log(res.data);
        fetchData();
      });
  }


  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <>
      <form className='note-create' onSubmit={(e) => {
        handleSubmit(e)
      }}>
        <input type="text"  id="title" placeholder='enter title' />
        <input type="text" id="description" placeholder='enter description' />
        <button type="submit">Create Note</button>
      </form>
    <div className='notes'>
      {notes?.map((note) => {
        return <div className="note">
          <h1>{note.title}</h1>
          <h3>{note.description}</h3>
          <button onClick={() => { noteDelete(note._id) }}>delete</button>
        </div>
        
      })}
      </div>
    </>
  )
}

export default App