import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import { nextOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import { connectToMongodb } from "../../../../lib/dbconnect";
import {NextResponse,NextRequest} from 'next/server'

export async function POST(request:NextRequest) {
  // connect to mongodb
  connectToMongodb()

  try {

    const session = await getServerSession(nextOptions)
    const user = session?.user as User

    if(!user) return NextResponse.json({success : false , message : "user not login" } , {status : 400})
    
    const findUser = await UserModel.findById(user?._id)
    const {acceptingMessage} = await request.json()

    if(!findUser) return NextResponse.json({success : false , message : 'user not found' } ,{status : 404})
    
    findUser.isAcceptingMessage = acceptingMessage
    await findUser.save()

    return NextResponse.json({success : true , message : "user accept message updated" , findUser})
    
  } catch (error) {
    console.log('Error in sendToggle accept message',error)
    return NextResponse.json({
        success : false,
        message : 'Error in sendToggle accept message '
    })
  }
}

export async function GET(request:NextRequest) {
    try {
     const session = await getServerSession(nextOptions)
     const user = session?.user as User
     if(!session) return NextResponse.json({success : false, message : "user not logedin"})
    
     const findUser = await UserModel.findById(user?._id)
     if (!findUser) return NextResponse.json({success : false , message : "user not found"},{status : 404})

     return NextResponse.json({
        success : true,
        isAcceptingMessage : findUser.isAcceptingMessage
     })
    } catch (error) {
        console.log('Error in getStatus of user isAccepting messages',error)
        return NextResponse.json({
            success : false,
            message : 'Error in getStatus of user isAccepting messages '
        })
    }
}