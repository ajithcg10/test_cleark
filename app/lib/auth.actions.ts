"use server"
import { connectToDB } from "../database"
import User from "../database/models/User"
import { AuthProps, LoginProps,UpdatUSerProps } from "../type"
import bcrypt from 'bcrypt';
import userdata from "./Redux/userdata";
import Login from "../database/models/Login";
import { revalidatePath } from "next/cache";


const populateEvent = (query: any) => {
  return query
    .populate({ path: 'loginDetails', model: User })
}

export const AuthCreate = async ({user}:AuthProps)=>{ 
    try{
      await connectToDB()

      // const hasPAsword = await bcrypt.hash(user.password ,10)
      const emailverify = await User.findOne({ email: user.email})
      if(emailverify){
        return JSON.parse(JSON.stringify({message:"This Email Already Exists",status:401}))
      }


      const NewUsers = await User.create({...user})
      

      return JSON.parse(JSON.stringify({data:NewUsers, status:200}))
    }
    catch(err){
        console.log(err)
    }
}  


export const AuthLogin = async ({user,isVerifyed}:LoginProps)=>{
    try{
      await connectToDB()
      const foundUser = await User.findOne({email: user.email})
      const hasPAsword = await bcrypt.hash(user.password ,10)
    
      
      const CreateLogin = await Login.create({...user,loginDetails:foundUser._id,isVerifyed:isVerifyed})
      
      if(!foundUser){
        throw new Error(`email is not available`)
      }
 
      const isPasswordMatch = await bcrypt.compare(user?.password,foundUser?.password,)
    
      
      if(!isPasswordMatch ){
        return JSON.parse(JSON.stringify({message:"password is not available",status:404}))
      }
     return JSON.parse(JSON.stringify({CreateLogin,status:200}))
      

    
    }
    catch(err){
        console.log(err)
    }
}

export const getUserData_ById = async ({userId}:{userId:string}) =>{
  try {
    await connectToDB()
   ;
    
    const UserData =  await  Login.findOne({ email:userId }).populate('loginDetails').sort({ createdAt: -1 }).exec();

   
    
    if(!UserData){
      throw new Error(`User ${userId} not found`)
    } 
    return JSON.parse(JSON.stringify({data:UserData}))
    
  } catch (error) {
    console.log(error)
  }

}

export const UserUpdate = async ({userId,user,path}:UpdatUSerProps)=>{
 try {
  await connectToDB()
  const updateUSer  = await User.findByIdAndUpdate(
    userId,
    {...user},
    {new: true}
    )
    if(!updateUSer){
      throw new Error("User not found")
    }
    revalidatePath(path)
    return JSON.parse(JSON.stringify(updateUSer))
 } catch (error) {
  
 }
    


}