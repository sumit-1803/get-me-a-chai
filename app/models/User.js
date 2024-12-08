import mongoose from "mongoose";
const {Schema , model } = mongoose;

const UserSchema = new Schema({
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    name:{type:String },
    username:{type:String },
    profilePicture:{type:String , default:"https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"},
    coverPicture:{type:String},
    razorpayId: { type: String },
    razorpaySecret: { type: String },
    numOfPayments : {type:Number , default:0},
    raisedMoney : {type:Number , default:0},
    providers: { type: [String], default: [] }, // Track linked providers
    createdAt:{type:Date , default:Date.now},
    updatedAt:{type:Date , default:Date.now},
});


export default  mongoose.models.User || model("User",UserSchema);