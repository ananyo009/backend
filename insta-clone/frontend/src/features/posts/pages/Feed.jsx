import React, { useEffect } from 'react'
import Post from '../components/post'
import { usePost } from '../hooks/usepost'
import Navbar from '../components/Navbar'
import '../styles/feed.scss'

const Feed = () => {
    const { loading, feed, handleGetFeed,handlelikePost,handleunlikePost } = usePost()
    
    useEffect(() => {
        handleGetFeed()
    }, [])
    

    if (loading || !feed) {
        return (<main>
            <h1>Feed is Loading</h1>
        </main>)
    }

    return (
        <div className='main-feed'>
            <div className="nav">
                <Navbar/>
            </div>
            {feed.map((post,id) => {
                return <Post user={post.user} post={post} id={id} handlelike={handlelikePost} handleunlike={handleunlikePost} />
            })}
        </div>
  )
}

export default Feed