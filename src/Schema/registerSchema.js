import * as zod from "zod"

export const schema=zod.object({
    name:zod.string()
    .nonempty('Name is Required')
    .min(3,"minimum 3 letters")
    .max(20,"maximum 20 letters"),
    email:zod.string()
    .nonempty('email is required')
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"email is invalid"),
    password:zod.string()
    .nonempty('Password is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Minimum 8 characters,At Least: one uppercase letter,one lowercase letter,one digit,one special character "),
rePassword:zod.string(),
dateOfBirth:zod.coerce.date().refine((data)=>{
const birthDate=data.getFullYear()
const now=new Date().getFullYear()
const age=now-birthDate;
return age>=18
},{message:"you must be at least 18 years old"}),
gender:zod.string().
nonempty('Gender is required')
.regex(/^(male|female)$/,"enter valid gender")

}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });