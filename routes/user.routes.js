const express=require("express")

const {UserModel}=require("../models/user.model")
const bcrypt = require('bcrypt');
const userRouter=express.Router()
const jwt=require("jsonwebtoken")

userRouter.get("/",async(req,res)=>{
    try {
        const users=await UserModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({"error":error})
    }
    
})

userRouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body
   try {
    bcrypt.hash(pass, 5, async(err, hash) =>{
       if(err){res.status(200).send({"error":err})}
       else{const user=new UserModel({username,email,pass:hash})
        await user.save()
        res.status(200).send({"msg":"A new user has been registered"})}
    });

    
   } catch (error) {
    res.status(400).send({"error":err})
   }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.findOne({email})
        bcrypt.compare(pass, user.pass, async(err, result) =>{
           if(result){
const token=jwt.sign({userID:user._id,username:user.username},"masai")
res.status(200).send({"msg":"Login Successfull !","token":token})
           }else{
            res.status(200).send({"msg":"Wrong Credentials"})
           }
        });
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

module.exports={
    userRouter
}