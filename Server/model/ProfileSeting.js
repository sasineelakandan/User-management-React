const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email Address is required'],
        match: [/^\S+@\S+$/i, 'Invalid email address'],
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is required'],
        match: [/^\d{10}$/, 'Invalid phone number'],
    },
    profilePicture: {
        type: String, 
    },
   
});

const ProfileSet = mongoose.model('ProfileSet', UserSchema);

module.exports = ProfileSet;