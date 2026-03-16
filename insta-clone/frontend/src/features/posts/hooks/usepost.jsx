import { useContext } from "react";
import { postContext } from "../post.context";
import {getFeed} from '../services/Post.api'


export const usePost = () =>{
    const context = useContext(postContext);
    
    const {loading,setloading, feed, setfeed } = context;

    const handleGetFeed = async () => {
        setloading(true)
        const data = await getFeed()
        setfeed(data.feed)
        setloading(false)

    }

    return { feed, handleGetFeed,loading}
}