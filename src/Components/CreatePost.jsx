import React, { useState } from "react";
import { addPostApi } from "../services/PostSerices";


export default function CreatePost({getAllPosts}){
    const[showForm,setShowForm]=useState(false)
    const[caption,setCaption]=useState("")
const[imageFile,setImageFile] =useState(null)
const[imagePreview,setImagePreview] =useState("")
const[isSubmitting,setIsSubmitting]=useState(false)
async function handleSubmit(e){
e.preventDefault()
if(caption.trim() == "" && imageFile == null){
    return;
}
const formData=new FormData()
if(caption){formData.append('body',caption)}
if(imageFile){formData.append('image',imageFile)}
setIsSubmitting(true)
const response=await addPostApi(formData)
handleRemoveImage()
setCaption('')
setIsSubmitting(false)
getAllPosts()
setShowForm(false)
console.log(response)
}

function handleFileChange(e){
    if(e.target.files[0]){
        setImageFile(e.target.files[0])
       setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

}

function handleRemoveImage(){
    setImageFile(null)
    setImagePreview("") 
    document.getElementById('fileInput').value=""
}


return(
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
{showForm?
    <form onSubmit={handleSubmit} className="space-y-4">
    {/* Caption Input */}
    <div>
        <textarea
        autoFocus
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
        />
    </div>

    {/* Image Preview */}
    {imagePreview && <div className="relative">
        <img
            src={imagePreview}
            alt="Preview"
            className="w-full max-h-64 object-cover rounded-lg"
        />
        <button
            onClick={handleRemoveImage}
            type="button"
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>}

    {/* Error Message */}
    {false && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
        Error
    </div>}

    {/* Action Buttons */}
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            {/* Image Upload Button */}
            <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
                <input
                    // onChange={(e) => handleFileChange(e)}
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                />
                <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Photo</span>
                </div>
            </label>
        </div>

        <div className="flex items-center space-x-2">
            <button
                onClick={() => setShowForm(false)}
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200 disabled:opacity-50"
            >
                Cancel
            </button>
            <button
                disabled={isSubmitting || (caption.trim() == "" && imageFile == null)}
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
                {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Posting...</span>
                    </span>
                ) : (
                    'Post'
                )}
            </button>
        </div>
    </div>
</form>
:
    <button onClick={()=>setShowForm(true)} className="w-full cursor-pointer text-left text-gray-500 hover:text-gray-700 bg-gray-100">What's in your mind
    </button>

}    
</div>
)

}