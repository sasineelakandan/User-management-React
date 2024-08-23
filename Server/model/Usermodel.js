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
   
   
})

const User = mongoose.model('User', userShema);

export default User