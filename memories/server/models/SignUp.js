import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: String,
    name: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
    picture: {
        data: Buffer,
        contentType: String,
    }, 
    postsIDs:{
        type: [String], 
        default: String,
    }

})

export const signUpModel = mongoose.model('sign up',UserSchema)