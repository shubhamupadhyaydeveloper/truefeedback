import mongoose,{Document} from "mongoose";

export type TuserSchema = Document & {
    username : string,
    email : string,
    password : string,
    isVerified : boolean,
    verifyCode : string,
    verifyCodeExpiry : Date,
    isAcceptingMessage : boolean,
    messages : [mongoose.Schema.Types.ObjectId]
}

export type TmessageSchema = Document & {
    content : string
}
