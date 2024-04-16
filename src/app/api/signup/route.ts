import { NextRequest, NextResponse } from "next/server";
import { connectToMongodb } from "../../../../lib/dbconnect";
import User from "@/models/user.model";
import { Tsignup } from "@/types/type";
import { sendVerificationEmail } from "../../../../helpers/sendVerificationEmail";
import bcrypt from 'bcryptjs'

// mongodb connection
connectToMongodb()

export async function POST(request: NextRequest) {
  try {
    const { username, email, password }: Tsignup = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + 1)
    const codeGenerator = Math.floor(100000 + Math.random() * 899999).toString()

    const userFindByUsername = await User.findOne({
      username,
      isVerified: true
    })

    if (userFindByUsername) {
      return NextResponse.json({ success: false, message: 'user already registered' }, { status: 400 })
    }

    const userFindByEmail = await User.findOne({ email })

    if (userFindByEmail) {
      if (userFindByEmail.isVerified) {
        return NextResponse.json({ success: false, message: "user already registered" }, { status: 400 })
      } else {
        userFindByEmail.password = hashedPassword
        userFindByEmail.verifyCodeExpiry = expiryDate
        userFindByEmail.verifyCode = codeGenerator
        await userFindByEmail.save()
      }
    } else {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        verifyCodeExpiry: expiryDate,
        verifyCode: codeGenerator,
        messages: [],
      })
      await newUser.save()
    }

    // send otp
    const emailVerification = await  sendVerificationEmail(username, email, codeGenerator)

    if(!emailVerification.success) {
      return Response.json(
        {
          success: false,
          message: emailVerification.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Signup successful next verify email' },{status :  201})

  } catch (error) {
    console.error('Error in SignupUser', error)
     
    return NextResponse.json({ success: false, message: error },
      { status: 500 }
    )
  }
}