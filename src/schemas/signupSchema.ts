import {z} from 'zod'

export const usernameSchema = z
.string()
.min(3, 'Username atleast 3 digit')
.max(30, 'Username must be no more than 30 characters')


export const signupSchema = z.object({
    username : usernameSchema,
    email : z.string().email({message : 'email not valid'}),
    password : z.string().min(4,'password atleast 4 digit')
})