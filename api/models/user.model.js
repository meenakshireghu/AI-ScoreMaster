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
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
        //  Fields for question paper, answer key, and answer sheets
        questionPapers: [
         {
           title: {
             type: String,
             required: true,
           },
           file: {
             type: String,
             required: true,
           },
         },
       ],
       answerKeys: [
         {
           title: {
             type: String,
             required: true,
           },
           file: {
             type: String,
             required: true,
           },
         },
       ],
       answerSheets: [
         {
           title: {
             type: String,
             required: true,
           },
           student: {
             type: mongoose.Schema.Types.ObjectId, // allows you to associate an answer sheet with a specific student.
             ref: "Student",
           },
           file: {
             type: String,
             required: true,
           },
           grade: {
             type: Number,
             required: true,
           },
         },
       ],

    
},
{ timestamps: true}
);

// model creation
const User = mongoose.model('User', userScheme);

export default User;
