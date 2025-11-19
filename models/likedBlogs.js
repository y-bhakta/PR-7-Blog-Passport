import mongoose from "mongoose";

const likedBlogSchema=new mongoose.Schema({
    likeblogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    likeuserid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
});

const LikedBlogs=mongoose.model('LikedBlog',likedBlogSchema);
export default LikedBlogs;