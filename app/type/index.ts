export interface AuthProps {
    user:{
        userName:string,
        email:string,
        clerkId?:string,
        password:string,
        profileImage?:string,
    }
}
export interface LoginProps {
    user:{
        email:string,
        password:string,
    }
    isVerifyed:boolean,
    
}
export interface UpdatUSerProps {
    userId:String,
    user:{
        _id: string,
        chats:any[],
        username:string,
        email:string,
        // password:string,
        profileImage:string,
        __v: number,
      },
      path:string
}


export type LoginDetailsProps ={
    chats: any[];
    email: string;
    password: string;
    profileImage: string;
    username: string;
    __v: number;
    _id: string;
  }
  
export  type UserDataProps ={
   data:{
    _id: string; // Mongoose-generated ObjectID
    clerkId: string;
    email: string;
    username?: string; // Optional username
    profileImage: string;
    firstName?: string;
    lastName?: string;
    chats: string[]; // Array of chat IDs (assuming chat IDs are strings)
    __v: number; //
   } 
  }



export  interface  Member {
     _id: string;
    chats: string[]; // Assuming chats are strings
    email: string;
    password: string;
    profileImage: string;
    userName: string;
    __v: number;

  }
  export interface MessageDataProps {
    _id: string;
    createdAt: Date;
    photo: string;
    seenBy: string[];
    sender: {
      _id: string;
      userName: string;
      email: string;
      password: string;
      profileImage: string;
      // Other properties of the sender
    };
    text: string;
    __v: number;
  }
 export interface ChatGroupData {
    createdAt: Date;
    groupPhoto: string;
    isGroup: boolean;
    lastMessageAt: Date;
    members:Member[]
    message: MessageDataProps[]; // You can specify the type of message array here, e.g., string[] if it contains strings
    name: string;
    __v: number;
    _id: string;
  }

  export interface MessageProps {
    chatId:string
    currentUserId :string
    text?: string
    photo?:string
  }


export interface UpdateSeenMessageProps {
chatId:string,
currentUserId:string
}