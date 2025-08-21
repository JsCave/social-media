import * as zod from "zod"

export const loginSchema=zod.object({
    email:zod.string()
    .nonempty('email is required')
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"email is invalid"),
    password:zod.string()
    .nonempty('Password is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Minimum 8 characters,At Least: one uppercase letter,one lowercase letter,one digit,one special character "),



});