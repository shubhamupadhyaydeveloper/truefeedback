import User from "@/models/user.model";
import { connectToMongodb } from "../../../../lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import { usernameSchema } from "@/schemas/signupSchema";
import {z} from 'zod'

const checkUsernameSchema = z.object({
  username : usernameSchema
})

export async function GET(request: NextRequest) {
  // mongodb connection
  await connectToMongodb();


  try {
   const { searchParams } = new URL(request.url)
   const queryParam = {
     username : searchParams.get('username')
   }

   const result = checkUsernameSchema.safeParse(queryParam)
   if(!result.success) {
     return NextResponse.json({success : false , message : `${result.error.format().username?._errors}`})
   }

   const {username} = result.data
   console.log(username)
 
   const user = await User.findOne({
    username,
    isVerified : true
   })
   if(user) {
     return NextResponse.json({success : false , message : "username is registerd"})
   }
  
   return NextResponse.json({success : true , message : 'username is available'})

  } catch (error) {
    console.error("Error in check-username", error);
    return NextResponse.json({
      success: false,
      message: "error in check-username",
    });
  }
}
