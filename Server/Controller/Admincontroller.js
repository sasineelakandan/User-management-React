import jwt from 'jsonwebtoken';
import pkg from 'bcryptjs';
const { genSalt, hash ,} = pkg
import { ADMIN, PASSWORD, JWT_KEY } from '../utils/config.js'; // Adjust the import according to where your variables are defined
import User from '../model/Usermodel.js';
export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required.' });
      }
      if (email!==ADMIN || password!==PASSWORD) {
        console.log('hai')
        return res.send({ passVer:true  });
      }
  
      if (email === ADMIN && password === PASSWORD) {
        const token = jwt.sign({ email: ADMIN }, JWT_KEY, { expiresIn: '1h' });
  
        return res.status(200).cookie('token', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000, 
        }).send({
          message: 'Admin logged in successfully!',
          token: token,
          AdminVer: true,
        });
      } else {
        return res.status(401).send({ message: 'Invalid email or password.',passVer:true });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'An error occurred during login.',AdminVer:false });
    }
  };

  export const Users=async(req,res)=>{
    try{
        const users= await User.find({})
        res.send(users)
    }catch(err){
      console.log(err)
    }
  }

export const editPage=async(req,res)=>{

  try{ 
     const user=await User.findOne({_id:req.query.id})
     
     res.send(user)
     
    
  }catch(err){
    console.log(err)
  }
}
    

export const updateUser=async(req,res)=>{

  try{ 
    
    
    const update= await User.updateOne({_id:req.query.id},{$set:{
      Name:req.body.name,
      email:req.body.email,
      phone:req.body.phone
    }})
     
    res.send({sucess:true})
    
  }catch(err){
    console.log(err)
  }
}


export const addUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if the user already exists by email
    const existingUser = await User.findOne({ email: email ,phone:phone });
    if (existingUser) {
      return res.status(400).json({ userExists: true, message: 'Email already exists' });
    }
    
    
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    
    
    const newUser = new User({ 
      Name: name,
      email: email,
      phone: phone,
      Password: hashedPassword
    });
    
    
    await newUser.save();
    
    
    return res.status(201).json({ success: true, message: 'User added successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
