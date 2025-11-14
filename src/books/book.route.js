import { Router } from "express";
import { Book } from "./book.model.js";
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from "./book.controller.js";


const router = Router();



router.route("/create-book").post(createBook)


router.route("/").get(getAllBooks)
router.route("/:id").get(getSingleBook)
router.route("/edit/:id").put(updateBook)
router.route("/delete/:id").delete(deleteBook)
export default router