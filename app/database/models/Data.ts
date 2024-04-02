import { Schema, model, models } from "mongoose";

const DataSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
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
});

const Data = models?.Data || model("Data", DataSchema);

export default Data;
