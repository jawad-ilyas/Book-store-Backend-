import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./db/index.db.js";
import cors from "cors"




const app = express();


dotenv.config()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))





// Middlewares
app.use(express.json());

// Routes
// app.use("/", (req, res) => {
//     console.log("you created the server");
//     res.send("Server is running!");
// });


import BookRouter from "./src/books/book.route.js"
import OrderRouter from "./src/orders/orders.routes.js"

app.use("/api/v1/book", BookRouter)
app.use("/api/v1/order", OrderRouter)





connectDb()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("app is listening on the port ", process.env.PORT || 3000);

        })
    }).catch((error) => {
        console.log("error into db conneciton on main file ", error);

    })



app.use('/', () => {
    console.log("you create the server ");

})

