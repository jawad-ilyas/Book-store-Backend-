import { Router } from "express";
import { createOrder ,getOrdersForUser} from "./orders.controller.js";

const router = Router();


router.route("/create-order").post(createOrder)
router.route("/getOrdersForUser/:email").get(getOrdersForUser)


export default router;