import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./db/index.db.js";





const app = express();


dotenv.config()






// Middlewares
app.use(express.json());

// Routes
// app.use("/", (req, res) => {
//     console.log("you created the server");
//     res.send("Server is running!");
// });


import BookRouter from "./src/books/book.route.js"

app.use("/api/v1/book" , BookRouter)





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

