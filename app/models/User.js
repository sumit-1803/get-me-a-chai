import mongoose from "mongoose";
const {Schema , model } = mongoose;

const UserSchema = new Schema({
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    name:{type:String },
    username:{type:String },
    profilePicture:{type:String},
    coverPicture:{type:String},
    razorpayId: { type: String },
    razorpaySecret: { type: String },
    providers: { type: [String], default: [] }, // Track linked providers
    createdAt:{type:Date , default:Date.now},
    updatedAt:{type:Date , default:Date.now},
});


export default  mongoose.models.User || model("User",UserSchema);