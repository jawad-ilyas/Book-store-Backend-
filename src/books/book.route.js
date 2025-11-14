import { Router } from "express";
import { Book } from "./book.model.js";
import { createBook, getAllBooks } from "./book.controller.js";


const router = Router();



router.route("/create-book").post(createBook)


router.route("/").get(getAllBooks)
export default router