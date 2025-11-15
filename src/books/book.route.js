import { Router } from "express";
import { Book } from "./book.model.js";
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from "./book.controller.js";
import { adminAuthMiddleware } from "../middlwerware/verifyAdminToken.js";


const router = Router();



router.route("/create-book").post(adminAuthMiddleware, createBook)


router.route("/").get(getAllBooks)
router.route("/:id").get(getSingleBook)
router.route("/edit/:id").put(adminAuthMiddleware, updateBook)
router.route("/delete/:id").delete(adminAuthMiddleware, deleteBook)
export default router