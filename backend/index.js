import express from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from "cors";

const app = express();
app.use(express.json())

//Middleware to handle CORS policy
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

//Route to the homepage
app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to the Bookstore App")
})

app.use('/books', booksRoute)

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