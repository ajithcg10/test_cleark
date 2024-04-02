
import { Document, Schema, model, models } from "mongoose";

const UserSechema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    profileImage:{
        type: String,
        default:''
    },
    
    chats:{
        type:[{type:Schema.Types.ObjectId,ref:"chat"}],
        default:[]
    },
    clerkId:{type:String, default:""},
}
)
const User = models.User || model('User',UserSechema);

export default User
