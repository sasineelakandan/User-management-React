import User from '../model/Usermodel.js'
import pkg from 'bcryptjs';
import bcrypt from 'bcryptjs'
const { genSalt, hash ,} = pkg;
import jwt from'jsonwebtoken'
import { JWT_KEY } from '../utils/config.js';

         
export const Signup=async(req,res,next)=>{
    try{
        
        const {name,email,password,phone}=req.body
        const salt= await genSalt(10)
        const hashedPassword=await hash(password,salt)
        const newUser = new User({
            Name: name,
            email:email,
            phone:phone,
            Password: hashedPassword, 
          });
          await newUser.save();
      
      const token=  jwt.sign({id:newUser.id,email:newUser.email},String(JWT_KEY),{ expiresIn: '1h' })
      
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
       
      const user = await User.findOne({ email: req.body.email });
      
      
      if (!user) {
      
        return res.send({ userVer: false });
      }
    
    
      const passwordVer = await bcrypt.compare(req.body.password, user.Password);
    
      if (!passwordVer) {
       
        return res.send({ passVer:true });
      }
      const token=  jwt.sign({id:user.id,email:user.email},String(JWT_KEY),{ expiresIn: '1h' })
      
      res.status(200).cookie('token', token, {
      httpOnly: true,
    
     maxAge: 60 * 60 * 1000, 
      }).send({
        message: 'User registered successfully!',
        token: token,
        userVer: true 
      }); 
      }catch(err){
      console.log(err)
    }
  }


  export const Profile=async(req,res)=>{
  
    try{ 
      
      const user=await User.findOne({_id:req.user.id})
      res.send({user})
       
        
   
    
      

    }catch(err){
      console.log(err)
    }
  }
  
  
  
  