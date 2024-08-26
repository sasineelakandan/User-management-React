import mongoose from "mongoose";



const userShema= new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'Name is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,

    },
    Password:{
        type:String,
        required:[true,'Password is required'],
       

    },
    phone: {
        type: String,
        required: [true, 'Phone Number is required'],
        match: [/^\d{10}$/, 'Invalid phone number'],
    },
    ProfileSettings: {
        type: String,
        
    }
   
   
})

const User = mongoose.model('User', userShema);

export default User