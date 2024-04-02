"use server"

import path from "path"
import { connectToDB } from "../database"
import Chat from "../database/models/Chat"
import Message from "../database/models/Message"
import User from "../database/models/User"

type ChatProps ={
    currentUser:string,
    members:any[],
    isGroup:boolean,
    name:String,
    gropupPhoto?:String
}
type chatProps = {
    userID:string,
    params?:string
}


export const create_chat = async ({user}:{user:ChatProps}) => {
    try {
        await connectToDB()
        const {gropupPhoto,isGroup ,name,members,currentUser} = user
        const query = user.isGroup ? {gropupPhoto,isGroup,name,members:[currentUser,...members]} : {members:{$all:[currentUser,...members],$size:2}}
        let chat = await Chat.findOne(query)
        if(!chat){
            chat = await  Chat.create(   
                isGroup ? query : { members: [currentUser, ...members] }
            )
        }
       
        const updatAllMembers =chat.members.map( async(memberId:string)=>{
              await User.findByIdAndUpdate(
                memberId,
                {$addToSet:{chats:chat._id}},
                {new:true}
                )
        })
        Promise.all(updatAllMembers)
    return JSON.parse(JSON.stringify(chat))
    } catch (error) {
        
    }
}

export const getAllChat =  async ({userID,params}:chatProps)=>{
    try {
        await connectToDB()
        const memberConditon = {members:userID}
        const serachCondtion =params ? {name :{$regex:params,$options:'i'}} : {}  
        // const serachCondtions =params ? {members :{$regex:params,$options:'i'}} : {}  

        const conndition ={
            $and:[memberConditon,serachCondtion]
        }
        const chat_list = await Chat.find(conndition).sort({lastMessageAt:-1}).populate({path:'members', model:User}).populate({path:"message",model:Message,populate:{
            path:"sender seenBy",
            model:User
        }}).exec()
        return JSON.parse(JSON.stringify(chat_list))
    } catch (error) {
        console.log(error)
    }

}


export const getByIdChat = async (chatId:string)=>{
    try {
        await connectToDB()
        const chatIdbydata = await Chat.findById(chatId).populate({
            path:"members",
            model:User
        }).populate({
            path:"message",
            model:Message,
            populate:{
                path:"sender seenBy",
                model:User
            }
        }).exec()
        return JSON.parse(JSON.stringify(chatIdbydata))
    } catch (error) {
        
    }
}

