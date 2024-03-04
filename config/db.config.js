import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("connected to mongodb"))
    .catch((err)=>console.log(`error while connecting to mongodb, ${err}`))
}