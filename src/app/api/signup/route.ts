import { NextRequest, NextResponse } from "next/server";
import { connectToMongodb } from "../../../../lib/dbconnect";
import User from "@/models/user.model";
import { Tsignup } from "@/types/type";
import bcrypt from 'bcryptjs'

// mongodb connection
connectToMongodb()

export async function POST(request:NextRequest) {
     try {
      const {username,email,password}:Tsignup = await request.json()
      const hashedPassword = await bcrypt.hash(password,10)

      const user = await User.find({email})
      if(user) {
        //code
      } else {

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })
        await newUser.save() 
      }

     } catch (error) {
        console.error('Error in SignupUser',error)
        return NextResponse.json({success : false,message :error},
            {status : 500}
        )
     }
}