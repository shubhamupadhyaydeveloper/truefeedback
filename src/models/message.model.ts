import mongoose,{Model} from "mongoose";
import { TmessageSchema } from "@/types/type";

const messageSchema = new mongoose.Schema<TmessageSchema>({
   content : {
    type : String,
    min : [4,'content atlest 4 digit'],
    max : [300,'content not more than 300 digit']
   }
},{timestamps : true})

const Message:Model<TmessageSchema> = mongoose.models.Message || mongoose.model('Message',messageSchema)
export default Message