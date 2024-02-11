import express from "express"
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route to get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error) {
        response.status(500).send({message: error.message})
    }
})

//Route to get a book by its ID.
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params
        
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch(error) {
        response.status(500).send({message: error.message})
    }
})

//Route to submit a new Book
router.post('/', async (request, response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({message: 'Required field is missing information'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook);
        return response.status(201).send(book)
    
    } catch(error) {
        console.log("Houston... " + error)
        response.status(500).send({message: error.message}) 
    }
})

//Route to update a book by its ID.
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({message: 'Required field is missing information'});
        }

        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body);
        
        if(!result) {
            return response.status(404).json({message: "Book not Found"});
        }

        return response.status(200).json({message: "Book Updated Successfully"})
    } catch(error) {
        response.status(500).send({message: error.message})
    }
})

//Route to delete a book. 
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const deletedBook = await Book.findByIdAndDelete(id)

        if(!deletedBook) {
            return response.status(404).json({message: "Book not Found"});
        }

        return response.status(200).json({message:`${deletedBook.title} was deleted successfully!`})

    }catch (error) {
        return response.status(500).send({message: error.message})
    }
})


export default router

