import mongoose ,{Model} from "mongoose";
import { TuserSchema } from "@/types/type";

const userSchema = new mongoose.Schema<TuserSchema>({
   username : {
     type : String,
     required : [true,'username is required'],
     trim  : true,
   },
   email : {
     type : String,
     required : [true,'email is required'],
     unique  : true,
     match : [/.+\@.+\../,'email not valid']
   },
   password : {
    type : String,
    required : [true,'password is required'],
    min : [4,'atleast 4 digit is required'],
    trim : true
   },
   isVerified : {
    type : Boolean,
    default :  false
   },
   verifyCode : {
     type : String,
     required : [true,'verifycode is required']
   },
   verifyCodeExpiry : {
    type : Date,
    required : [true,'verifycodeexpiry is required']
   },
   isAcceptingMessage : {
    type : Boolean,
    default : true
   },
   messages : {
     type : [mongoose.Schema.Types.ObjectId],
     ref : 'Message'
   }
},{timestamps : true})

const User:Model<TuserSchema> = mongoose.models.User || mongoose.model('User',userSchema)
export default User;