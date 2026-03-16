import React, { useEffect } from 'react'
import Post from '../components/post'
import { usePost } from '../hooks/usepost'

const Feed = () => {
    const { loading , feed, handleGetFeed } = usePost()
    
    useEffect(() => {
        handleGetFeed()
    }, [])
    

    if (loading || !feed) {
        return (<main>
            <h1>Feed is Loading</h1>
        </main>)
    }

    console.log(feed);

    return (
        <div>
            {feed.map((post,id) => {
                return <Post user={post.user} post={post} id={id} />
            })}
        </div>
  )
}

export default Feed