"use server"

import { Server } from 'socket.io';
import { connectToDB } from "../database"
import Chat from "../database/models/Chat"
import Message from "../database/models/Message"
import User from "../database/models/User"
import { MessageProps, UpdateSeenMessageProps } from "../type"
import { pusherServer } from "../../pusher/pusher"

const io = new Server();
export const Create_Message = async ({chatId,currentUserId,text,photo}:MessageProps)=>{
    try {
        await connectToDB()

    const currentUser = await User.findById(currentUserId);
        const newMessage = await Message.create({
            chat:chatId,
            sender:currentUser,
            text:text,
            photo:photo,
            seenBy:currentUserId
        }) 
        console.log(newMessage,"mess");
        
    const UpdateChat = await Chat.findByIdAndUpdate(chatId,
        {
            $push:{message:newMessage._id},
            $set:{lastMessageAt:newMessage.createdAt}
    },
    {new:true}
    ).populate({
        path:"message",
        model:Message,
        populate:{path:"sender seenBy" ,model:User}
    }).populate({
        path:"members",
        model:Chat
    })
 /* Trigger a Pusher event for a specific chat about the new message */
    await pusherServer.trigger(chatId, "new-message", newMessage)
    const lastMessage = UpdateChat.message[UpdateChat.message.length -1]

    UpdateChat.members.foraEach(async(member:any) =>{
        await pusherServer.trigger(member._id.toString(),"update-chat",{
            id:chatId,
            message:[lastMessage]
        })


    })

    return JSON.parse(JSON.stringify(newMessage))
    } catch (error) {
        
    }

}

export const UpdateSeenMessage = async({chatId,currentUserId}:UpdateSeenMessageProps)=>{

    try {
        await connectToDB()
        const UpdateSeen = await Message.updateMany(
            {chat:chatId},
            {$addToSet:{seenBy:currentUserId}},
            {new:true}
        ).populate(
          {  path:"sender seenBy",
            model:User}
        ).exec()

       
        return JSON.parse(JSON.stringify(UpdateSeen))
    } catch (error) {
        console.error(error)
    }

}