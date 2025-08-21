import React, { useContext, useState } from "react"
import Comment from "./Comment"
import CardHeader from "./Post/CardHeader"
import PostBody from "./Post/PostBody"
import PostFooter from "./Post/PostFooter"
import PostActions from "./Post/PostActions"
import { Button, Input,Dropdown,DropdownTrigger,DropdownMenu,DropdownSection,DropdownItem,Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,useDisclosure, addToast, ToastProvider} from "@heroui/react"
import { addComment } from "../services/CommentsService"
import { authContext } from "../contexts/authContext"
import { deletePostApi } from "../services/PostSerices"
import DropDownCard from "./DropDownCard"
import ModalComponent from './ModalComponent';

export default function Post({callback,post,commentsLimit}){
    const [visibleComments,setVisibleComments]=useState(2)
    const [isLoading,setIsLoading]=useState(false)
const [commentContent,setCommentContent]=useState("")
const [isCLoading,setIsCLoading]=useState(false)
const{userData}=useContext(authContext)
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const[isPostDeleteing,setIsPostDeleting]=useState(false)

async function handleDeletePost(onClose){
  setIsPostDeleting(true)
  const response=await deletePostApi(post._id)
  setIsPostDeleting(false)
  if(response.message=='success'){
    await callback()
    onClose()
    addToast({
      title: "Delete Post",
      description: "Post Deleted",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
      color:"success",
    });
    console.log('delete'+response)
  }

}

    function handleLoadMore(){
setIsLoading(true)
setTimeout(()=>{
    setVisibleComments(visibleComments+2)
    setIsLoading(false)},200)
    }

  async  function handleCommentSubmit(){
    setIsCLoading(true)
const response=await addComment(commentContent,post.id)
console.log(response)
setCommentContent('')
callback()
setIsCLoading(false)
    }
    
    return(
<div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
    <div className="w-full h-16  items-center flex justify-between ">

        <CardHeader avatar={post.user.photo} header={post.user.name} subheader={post.createdAt}/>
        {post.user._id==userData._id &&
<DropDownCard onOpen={onOpen}/>
}

    </div>
    <PostBody caption={post.body} image={post.image}/>

 <PostFooter commentsNum={post.comments.length}/>
<PostActions postId={post.id}/>
<div className="flex my-3">
<Input value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} variant="bordered" placeholder="Comment..." endContent={<Button onPress={handleCommentSubmit} isLoading={isCLoading}>Comment</Button>}/>
</div>
{post.comments.slice(0,commentsLimit??visibleComments).map((comment)=><Comment key={comment.id} comment={comment} getPosts={callback}/>)}
{post.comments.length>visibleComments && !commentsLimit && <Button isLoading={isLoading} className="mx-auto block" variant="faded" onPress={handleLoadMore}>
Load More</Button>}   

<ModalComponent deleteFunction={handleDeletePost} isOpen={isOpen} onOpenChange={onOpenChange} isPostDeleteing={isPostDeleteing}/>

</div>
    )
}