import axios from "axios";
const baseUrl="https://linked-posts.routemisr.com/"


export async function addComment(commentContent,postId){
    try{
        
        const {data}=await axios.post(baseUrl+"comments",{
            content:commentContent,
            post:postId
        },
           { headers:{
                token:localStorage.getItem('token')
            }
        })
        return data
    }catch(e){
return e.response ? e.response.data.error : e.message
    }

}


export async function deleteComment(postId){
    try{
        
        const {data}=await axios.delete(baseUrl+"comments/"+postId,
           { headers:{
                token:localStorage.getItem('token')
            }
        })
        return data
    }catch(e){
return e.response ? e.response.data.error : e.message
    }

}

export async function updateComment(postId,content){
    try{
        
        const {data}=await axios.put(baseUrl+"comments/"+postId,{content},
           { headers:{
                token:localStorage.getItem('token')
            }
        })
        return data
    }catch(e){
return e.response ? e.response.data.error : e.message
    }

}