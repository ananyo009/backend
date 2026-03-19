import { useContext,useEffect } from "react";
import { postContext } from "../post.context";
import {getFeed ,createPost, likePost, unlikePost} from '../services/Post.api'


export const usePost = () =>{
    const context = useContext(postContext);
    
    const {loading,setloading,feed, setfeed } = context;

    const handleGetFeed = async () => {
        setloading(true)
        const data = await getFeed()
        setfeed(data.feed.reverse())
        setloading(false)

    }

    const handlecreatePost = async (ImageFile, caption) => {
        setloading(true)
        const data = await createPost(ImageFile, caption)
        setfeed([data.post, ...feed])
        setloading(false)
        
    }

    const handlelikePost = async (post) => {

        const data = await likePost(post)
        await handleGetFeed()
    }

    const handleunlikePost = async (post) => {
        const data = await unlikePost(post)
        await handleGetFeed()
    }

    useEffect(() => {
        handleGetFeed()
    },[])

    return { feed, handleGetFeed,loading,handlecreatePost,handlelikePost,handleunlikePost}
}