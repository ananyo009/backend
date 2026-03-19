import React from 'react'

import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get("/feed")

    return response.data;
}

export async function createPost(ImageFile, caption) {

    const formdata = new FormData()

    formdata.append("photo",ImageFile)
    formdata.append("caption",caption)

    const response = await api.post('/', formdata)
    
    return response.data


}

export async function likePost(post) {
    const response = await api.post('/like/' + post)
    return response.data
}

export async function unlikePost(postId) {
    const response = await api.post('/unlike/' + post)
    return response.data
}