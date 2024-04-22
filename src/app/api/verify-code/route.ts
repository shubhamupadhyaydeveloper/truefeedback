import User from "@/models/user.model";
import {NextRequest,NextResponse} from 'next/server'

export async function POST(request:NextRequest) {
  try {

    const {username,verifycode} = await request.json();
    const user = await User.findOne({username})
    if(!user) return NextResponse.json({success : false, message :"User not found"},{status : 404})

    const isCodeMatch = user.verifyCode === verifycode
    const isExpiryValid = new Date(user.verifyCodeExpiry) > new Date()

    if(!isCodeMatch || !isExpiryValid) {
         return NextResponse.json({success : false, message : "Invalid verifyCode or verifyCodeExpiry"})
    }

    user.isVerified = true
    user.verifyCodeExpiry = new Date(0)
    await user.save()

    return NextResponse.json({success : true , message : 'user verified succesfully'})
    
  } catch (error) {
    console.log('Error in verify-code')
    return NextResponse.json({
        success : false,
        message : 'Error in verify-code'
    })
  }
}