import { Router } from "express";
import { createOrder } from "./orders.controller.js";

const router = Router();


router.route("/create-order").post(createOrder)


export default router;