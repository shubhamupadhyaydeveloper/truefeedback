import {z} from 'zod'

export const messageSchema = z.object({
   content : z.string().min(4,'message length atleast 4 digit')
             .max(300,'message not more than 300 digit')
})