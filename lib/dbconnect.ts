import mongoose from "mongoose";

type Connection = {
    isConnected? : number
}

const connection:Connection = {}

export async function connectToMongodb() {
    try {
    if(connection.isConnected) {
        console.log('connected to previous connection')
        return
    }

    const db = await mongoose.connect(process.env.MONGODB_URL as string || '')

    
    connection.isConnected = db.connections[0].readyState
    
   console.log('connected with new connection')
        
    } catch (error) {
        console.error('Error in connect mongodb',error)
        process.exit(1)
    }
}