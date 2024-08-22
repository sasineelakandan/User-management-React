
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

dotenv.config()


const app=express()
const Port=process.env.PORT||3001;
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
console.log('mongodb connected')
})
.catch((error)=>{
 console.log(error)
})
app.use(cors({
    origin: [process.env.ORIGIN],
    methods:['GET','PUT','POST','PATCH',"DELETE"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

const Server=app.listen(Port,()=>{
    console.log(`Server is Running ${Port}`)
})
