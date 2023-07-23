const express = require("express")
const qoutes = require("./static-data/todos.json")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user-routes")
const notesRoutes = require("./routes/notes-routes")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();

const app = express()

app.use(express.json());

app.use(cors())

app.use("/user", userRoutes)

app.use("/note", notesRoutes)

app.get("/", (req,res) => {
    res.status(200).json("Running")
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(
    () => {
        app.listen(PORT, () => {
            console.log("Server listen on port " + PORT)
        });
    }).catch((error) => {
        console.log(error)
    })