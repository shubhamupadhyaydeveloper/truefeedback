import {z} from 'zod'

export const usernameSchema = z
.string()
.min(3, 'Username must be at least 2 characters')
.max(30, 'Username must be no more than 30 characters')
.regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');


export const signupSchema = z.object({
    username : usernameSchema,
    email : z.string().email({message : 'email not valid'}),
    password : z.string().min(4,'password atleast 4 digit')
})