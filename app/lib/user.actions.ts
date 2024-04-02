"use server"
import { connectToDB } from "../database"
import User from "../database/models/User"

export const get_All_Conatct = async (query:string) =>{
    try {
       await connectToDB()
       const titleCondition = query ? { userName: { $regex: query, $options: 'i' } } : {}
       const conatcts = await User.find(titleCondition)
       if(!conatcts){
        return JSON.parse(JSON.stringify({message: "Not Found" ,status: 404}))
       }
       return JSON.parse(JSON.stringify(conatcts))
    } catch (error) {
        
    }
}