import mongoose,{ Schema } from "mongoose";
const followerSchema=new Schema({
    follower:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    following:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    followerName:{
        type:String,
        required:true
    },
    followingName:{
        type:String,
        required:true
    }
})
export const Follower=mongoose.model("Follower",followerSchema)