import {z} from 'zod'

export const usernameSchema = z
.string()
.min(2,'usename more than 2 digit')
.max(30,'username not more than 30 digit')
.regex(/^[a-zA-Z0-9_]+$/,'username not contain special character')


export const signupSchema = z.object({
    username : usernameSchema,
    email : z.string().email({message : 'email not valid'}),
    password : z.string().min(4,'password atleast 4 digit')
})