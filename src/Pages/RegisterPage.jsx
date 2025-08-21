import React, { useState } from "react";
import {Button, Input, Select, SelectItem} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod"
import { schema } from "../Schema/registerSchema";
import { registerApi } from "../services/authServices";





export default function RegisterPage(){

const[isLoading,setIsLoading]=useState(false)
const[errMsg,setErrMsg]=useState("")
const[successMsg,setSuccessMsg]=useState("")

const{handleSubmit,register,formState:{errors}}=useForm({
    defaultValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        dateOfBirth:"",
        gender:""
    },
    resolver: zodResolver(schema),
    mode:"onBlur"
})

   async function handleRegister(formData){
    setIsLoading(true)
      const data=await  registerApi(formData)
      setIsLoading(false)
      if(data.error){
        setErrMsg(data.error)
      }else{
        setErrMsg("")
        setSuccessMsg(data.message)
    }
console.log(data)

    }
    return(
        <>
        <div className="flex items-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded">
        <div className="inline-flex flex-col gap-5 items-center p-10 shadow-lg mx-auto  border-1 relative">
<h1 className="font-mono text-6xl">Register</h1>
<form className="inline-flex flex-col gap-5 items-center" onSubmit={handleSubmit(handleRegister)}>
<Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} label="UserName" placeholder="UserName" type="name" variant="bordered" {...register('name')}/>
<Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} label="Email" placeholder="Email" type="email" variant="bordered"  {...register('email')}/>
<Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" placeholder="Password" type="password" variant="bordered"  {...register('password')}/>
<Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors.rePassword?.message} label="Confirm Password" placeholder="Confirm Password" type="password" variant="bordered"  {...register('rePassword')}/>
<Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors.dateOfBirth?.message}  label="Date Of Birth" placeholder="Date Of Birth" type="date" variant="bordered"  {...register('dateOfBirth')}/>
<Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors.gender?.message} label="Gender" placeholder="Gender" variant="bordered"  {...register('gender',{required:true})}>
<SelectItem key={"male"}>Male</SelectItem>
<SelectItem key={"female"}>Female</SelectItem>
</Select>
<Button type='submit' isLoading={isLoading}  color="primary" variant="solid">Register</Button>
<p>{errMsg}</p>
<p>{successMsg}</p>
</form>
        </div>
        </div>
        </>
    )
}

