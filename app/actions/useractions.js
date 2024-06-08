"use server"

import Razorpay from "razorpay"
import Payment from "../models/Payment"
import connectDB from "../db/connectDB"
import User from "../models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })

    instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment 
    await Payment.create({oid: x.id, amount:amount/100, to_user : to_username, name:paymentform.name , message: paymentform.message})

    return x;

}


export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username });
    let user = u.toObject({ flattenObjectIds: true });
    return user;
};

export const fetchpayments = async(username)=>{
    await connectDB
    // find all payments sorted by dec order of amount and flatten object ids
    let p = await Payment.find({to_user:username}).sort({amount:-1}).lean()
    return p 
} 

export const updateProfile = async (data,oldusername)=>{
    await connectDB();
    let ndata = Object.fromEntries(data)

    // If the username is bieng updated check if username is availiable 
    if (oldusername !== ndata.username) {
        let u = await User.findOne({username:ndata.username})
        if (u) {
            return {error:"Username already exists"}
        }
    }

    await User.updateOne({email:ndata.email},ndata)
}