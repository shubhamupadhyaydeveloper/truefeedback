import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import { connectToMongodb } from "../../../../lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import { nextOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await connectToMongodb();

    const session = await getServerSession(nextOptions);
    const user = session?.user;

    if (!session)
      return NextResponse.json({ success: false, message: "user not logedin" });

    const userId = new mongoose.Types.ObjectId(user._id);

    const getMessages = await UserModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    if(getMessages.length === 0) {
        return NextResponse.json({success : false , message : "No message created yet"})
    }

    return NextResponse.json({
        success : true,
        getMessages
    })
  } catch (error) {
    console.log("Error in getMessages", error);
    return NextResponse.json({
      success: false,
      message: "error in getMessage",
    });
  }
}
