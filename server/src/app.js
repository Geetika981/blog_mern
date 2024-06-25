import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173",
    exposedHeaders: ["set-cookie"]
}))

app.use(cookieParser())
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


export {app};