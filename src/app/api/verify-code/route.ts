import User from "@/models/user.model";
import {NextRequest,NextResponse} from 'next/server'
import { connectToMongodb } from "../../../../lib/dbconnect";


export async function POST(request:NextRequest) {
  await connectToMongodb()
  try {

    const {username,verifycode} = await request.json();
    const user = await User.findOne({username})
    if(!user) return NextResponse.json({success : false, message :"User not found"},{status : 404})

    const isCodeMatch = user.verifyCode === verifycode
    const isExpiryValid = new Date(user.verifyCodeExpiry) > new Date()

    if(!isCodeMatch || !isExpiryValid) {
         return NextResponse.json({success : false, message : "Invalid verifyCode or verifyCodeExpiry"},{status : 401})
    }

    user.isVerified = true
    user.verifyCodeExpiry = new Date(0)
    await user.save()

    return NextResponse.json({success : true , message : 'user verified succesfully'},{status : 200})
    
  } catch (error) {
    console.log('Error in verify-code')
    return NextResponse.json({
        success : false,
        message : 'Error in verify-code'
    })
  }
}