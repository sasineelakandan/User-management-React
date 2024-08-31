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
          maxAge: 60 * 60 * 24 * 1000, 
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
      console.log(req.user)
      
        
        const users= await User.find()
      
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

  try {
    const { name, email, phone } = req.body
        const usercheck = await User.findOne({ $or: [{ email }, { phone }] })
        if (usercheck && req.query.id != usercheck._id) {
            res.send({ success: false })
        }
    const result = await User.updateOne(
      { _id: req.query.id },
      {
        $set: {
          Name: name,
          email: email,
          phone: phone
        }
      }
    );
   
    if (result.modifiedCount === 0) {
      return res.send({ success: true})
    }

    res.send({ success: true })
    
  } catch (err) {
    console.error(err);
    res.send({ success: false});
  }
}


export const addUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

   
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      return res.send({success: false});
    }

   
    const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
    console.log(existingUser)
    if (existingUser) {
      return res.send({userExists: true})
    }

   
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

   
    const newUser = new User({ 
      Name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      Password: hashedPassword
    });

   
    await newUser.save();
   
    
   
    return res.send({success:true})
  } catch (err) {
    console.error(err);
    return res.status({success:false})
};
 
}

export const Delete=async(req,res)=>{
  try{
    const update=  await User.deleteOne({_id:req.query.id})
    res.send({success:true})
  }catch(err){
    console.log(err)
  }
}


export const Search=async(req,res)=>{
  try {
    console.log(req.query)
    const searchuser = await User.find({ Name: { $regex: req.query.query, $options: 'i' } })
  
    res.send(searchuser)
} catch (error) {
    console.log(error)
}
}

