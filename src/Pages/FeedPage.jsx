import React, { useEffect, useState } from "react";
import { getAllPostsApi } from "../services/PostSerices";
import LoadingPage from "./LoadingPage";
import Post from "../Components/Post";
import CreatePost from "../Components/CreatePost";

export default function FeedPage(){
const [posts,setPosts]=useState([])
const [isLoading,setIsLoading]=useState(true)
    async function getPosts() {
        const data=await getAllPostsApi()
        if(data.message=='success'){
            setPosts(data.posts.reverse())
            setIsLoading(false)
        }
        console.log(data)
    }

    useEffect(()=>{
        getPosts()
        console.log(posts)
    },[])
    return(
        
        <div className="grid gap-3 max-w-2xl mx-auto">
            <CreatePost getAllPosts={getPosts}/>
{
    isLoading?<LoadingPage/>:
posts.map((post)=><Post callback={getPosts} key={post.id} post={post} commentsLimit={1}/>
    )
}

        </div>
        


        
    )
}

