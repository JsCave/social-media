import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePostApi } from "../services/PostSerices";
import Post from "../Components/Post";
import LoadingPage from "./LoadingPage";

export default function PostDetailsPage(){
    const [post,setPost]=useState(null)
   const {id}= useParams()
   
async function getSignalPost(){
    const response=await getSinglePostApi(id)
    console.log(response)
    if(response.message=='success'){
        setPost(response.post)
    }
}

useEffect(()=>{
    getSignalPost()
},[])
   
    return(
        <div className="w-1/2 flex justify-center items-center mx-auto">
       {post ? <Post post={post}/>:<LoadingPage/>}
        </div>
    )
}

