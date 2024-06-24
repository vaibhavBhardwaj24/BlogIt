import mongoose, { Schema } from "mongoose";
const liked=new Schema({
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    username:{
        type:String,
        required:true
    },
    userUrl:{
        type:String,
        
    },
    title: {
        type: String,
        required: true,
      },
})
export const Liked=mongoose.model("Liked",liked)