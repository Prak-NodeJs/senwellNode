import mongoose from "mongoose";
import validator from "validator";

const empSchema = new mongoose.Schema({
    empId:{
        type:Number,
        required:true,
        unique :true
    },
    name:{
        type:String,
        minlength: [4,'name should not be less than 4 character'],
        required:true,
    },
    email:{
        type:String,
        validate: [validator.isEmail,"Please enter valid email"],
        required:true,
        unique :true
    },
    salary:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    }
   
}, {timestamps:true})

export const Employee = mongoose.model('Employee', empSchema)