import { models } from "mongoose";
import { model } from "mongoose";
import { Schema } from "mongoose";


const LoginSchema = new Schema({
    email: { type: "string",readonly: true},
    password:{ type: "string",require: true},
    isVerifyed:{
        type:Boolean,
        default:false,
    },
    loginDetails:{
        type:Schema.Types.ObjectId,ref:"User"
    },
    createdAt:{type:Date, default:Date.now()},

})
const Login = models.Login || model('Login',LoginSchema);

export default Login