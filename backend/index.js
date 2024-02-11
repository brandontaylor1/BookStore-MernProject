import express from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();


app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to the BookStore App")
    })






mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to the database!")
        app.listen(PORT, () => {
            console.log(`Hey! We're Spinning on ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error) 
    })