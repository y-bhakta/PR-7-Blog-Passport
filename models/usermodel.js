import bcrpt from "bcrypt";
import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        enum:['admin','user'],
        type: String,
        default:'user'
    },
    isActive:{
        type: Boolean,
        default:true
    }
},{
    timestamps:true
});

userschema.pre('save',async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }
        this.password = await bcrpt.hash(this.password,10);       
        next();
    }catch(err){
        next(err);
    }
});

const User=mongoose.model('Users',userschema);
export default User;