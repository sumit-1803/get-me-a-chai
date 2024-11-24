import mongoose from "mongoose";
import Email from "next-auth/providers/email";
const {Schema , model } = mongoose;

const UserSchema = new Schema({
    email:{type:String , required:true},
    name:{type:String },
    username:{type:String },
    profilepic:{type:String},
    coverpic:{type:String},
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    providers: { type: [String], default: [] }, // Track linked providers
    createdAt:{type:Date , default:Date.now},
    updatedAt:{type:Date , default:Date.now},
});


export default  mongoose.models.User || model("User",UserSchema);