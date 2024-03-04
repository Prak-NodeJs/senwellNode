import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { dbConnection } from './config/db.config.js'
import empRoute from './routes/emp.route.js'


const app = express()

//middleware
app.use(express.json())

//db connection
dbConnection()


//routes
app.use('/v1/employee', empRoute)

//handle unkown routes
app.all('*', (req, res)=>{
    res.status(404).json({
        success:false,
        message:`requested url ${req.originalUrl} not found`
    })
})


//handling error
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const firstErrorField = Object.keys(err.errors)[0];
        const errorMessage = err.errors[firstErrorField].message;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    console.log(err)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({ success: false, message });
    next()
})


const PORT = process.env.PORT||4000

app.listen(PORT, ()=>{
    console.log(`server started on port number ${PORT}`)
})

