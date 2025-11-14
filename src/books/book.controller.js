import { Book } from "./book.model.js";


const createBook = async (req, res) => {

    try {

        const newBook = await Book({ ...req.body })
        await newBook.save()
        res.status(200).json({ message: "books are created ", book: newBook })
    } catch (error) {
        res.status(500).json({ message: "failed to create book" })
    }
}

const getAllBooks = async (req, res) => {


    try {
        const allBooks = await Book.find({})

        res.status(200).json({ message: "list of all bookds ", books: allBooks })
    } catch (error) {
        console.log('====================================');
        console.log("error into get all bookd route");
        console.log('====================================');
    }

}

export { createBook, getAllBooks }