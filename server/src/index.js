import dotenv from "dotenv";
dotenv.config({
    path:"./.env",
})
import {app} from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(()=>{
    app.listen(4000,(req,res)=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("error while connecting mongodb",error)
})