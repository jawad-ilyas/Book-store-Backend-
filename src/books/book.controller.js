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
        const allBooks = await Book.find({}).sort({ createdAt: -1 })

        res.status(200).json({ message: "list of all bookds ", books: allBooks })
    } catch (error) {
        console.log('====================================');
        console.log("error into get all bookd route");
        console.log('====================================');
    }

}


const getSingleBook = async (req, res) => {

    try {
        const { id } = req.params;

        if (!id) {
            res.status(404).json({ message: "book is not found " })

        }

        const book = await Book.findById(id)

        if (!book) {
            res.status(404).json({ message: "book is not found " })

        }
        res.status(200).json({ message: "get  bookds ", book })

    } catch (error) {
        console.log("error into get single bookd ", error);
        res.status(404).json({ message: "failed to fetch teh single book " })

    }
}



const updateBook = async (req, res) => {

    try {
        const { id } = req.params;
        console.log("id for the update case")
        const updateBook = await Book.findByIdAndUpdate(id, req?.body, { new: true })
        if (!updateBook) {
            res.status(404).json({ message: "book is not found " })

        }
        res.status(200).json({ message: "book are updated ", book: updateBook })

    } catch (error) {
        console.log("error into get single bookd ", error);
        res.status(404).json({ message: "failed to update the book " })

    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await Book.findByIdAndDelete(id, { new: true })
        if (!deleteBook) {
            res.status(404).json({ message: "book is not found " })

        }
        res.status(200).json({ message: "book are deleted ", })
    } catch (error) {
        console.log("error into get single bookd ", error);
        res.status(404).json({ message: "failed to delete the book " })
    }
}
export { createBook, getAllBooks, getSingleBook, updateBook, deleteBook }