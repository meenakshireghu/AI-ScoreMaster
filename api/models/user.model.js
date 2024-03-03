import mongoose from "mongoose";

//schema creation
const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
     },
     email: {
        type: String,
        required: true,
        unique: true,
     },
     password: {
        type: String,
        required: true,
     },
    
},{ timestamps: true});

// model creation
const User = mongoose.model('User', userScheme);

export default User;
