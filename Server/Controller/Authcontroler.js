import User from '../model/Usermodel.js'
import pkg from 'bcryptjs';
import bcrypt from 'bcryptjs'
const { genSalt, hash ,} = pkg;
import jwt from'jsonwebtoken'


export const Signup=async(req,res,next)=>{
    try{
        const key=process.env.JWT_KEY;
         console.log(key)
        const {name,email,password}=req.body
        const salt= await genSalt(10)
        const hashedPassword=await hash(password,salt)
        const newUser = new User({
            Name: name,
            email:email,
            Password: hashedPassword, 
          });
          await newUser.save();
      
      const token=  jwt.sign({id:newUser.id,email:newUser.email},String(key),{ expiresIn: '1h' })
      
      res.status(200).cookie('token', token, {
    httpOnly: true,
    
    maxAge: 60 * 60 * 1000, 
}).send({
        message: 'User registered successfully!',
        token: token,
      }); 

    }
    catch(err){
        res.status(500).json({ error: 'hello' });
    }
  }

  export const Login=async(req,res)=>{
    try{
        console.log(req.body)
       const {email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user){
            res.send({userVer:false})
        }

        const passwordVer=await bcrypt.compare(password,user.Password)
        if(!passwordVer){
            res.send({passVer:false})
        }

        if(user){
            res.send({userVer:true})
        }
    }catch(err){
      console.log(err)
    }
  }