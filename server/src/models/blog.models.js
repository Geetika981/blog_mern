import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        default:"https://www.google.com/imgres?q=default%20blog%20image&imgurl=https%3A%2F%2Famescounselingcenter.com%2Fwp-content%2Fuploads%2F2022%2F02%2Fblog_default.png&imgrefurl=https%3A%2F%2Famescounselingcenter.com%2Fpart-five-dating-and-vacation-ideas-in-summer-planning-vs-spontaneous-elkader-iowa%2F&docid=k3oqZMzMnIroWM&tbnid=3uXpR55WV-P_FM&vet=12ahUKEwil4J-g2faGAxUyzDgGHWeLD1IQM3oECE4QAA..i&w=964&h=600&hcb=2&ved=2ahUKEwil4J-g2faGAxUyzDgGHWeLD1IQM3oECE4QAA"
    }
},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema);