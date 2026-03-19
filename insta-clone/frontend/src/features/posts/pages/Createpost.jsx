import React from 'react'
import '../styles/createpost.scss'
import { useState, useRef } from 'react'
import { usePost } from '../hooks/usepost'
import { useNavigate } from 'react-router'


export const Createpost = () => {

    const [caption, setcaption] = useState("");

    const postImageInput = useRef(null)

    const navigate = useNavigate()

    const { loading, handlecreatePost } = usePost();

    async function handlesubmit(e) {
        e.preventDefault();

        const file = postImageInput.current.files[0];
        
        await handlecreatePost(file, caption)
        
        navigate('/feed')
        
    }

    function goback() {
        navigate("/feed")
    }

    if (loading) {
        return (<main>
            <h1>Creating post ...</h1>
        </main>
            
        )
    }

    return (
      <div className="create">
        <button onClick={goback} className= "button back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 13V20L4 12L12 4V11H20V13H12Z"></path>
          </svg>
        </button>
        <form onSubmit={handlesubmit}>
          <label className="Image-label" htmlFor="postImage">
            Select image
          </label>
          <input
            hidden
            ref={postImageInput}
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            onChange={(e) => {
              setcaption(e.target.value);
            }}
            type="text"
            name="caption"
            id="caption"
            placeholder="enter caption"
          />
          <button className="button primary">Create post</button>
        </form>
      </div>
    );
}

export default Createpost