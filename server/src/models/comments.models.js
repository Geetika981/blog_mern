import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    },
    content:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Comment=mongoose.model("Comment",commentSchema);