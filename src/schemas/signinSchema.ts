import {z} from 'zod'

export const signinSchema = z.object({
    email : z.string().email(),
    password : z.string().min(4,'password atleast 4 digits')
})