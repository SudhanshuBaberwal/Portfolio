import express from "express"
import cors from "cores"

const app = express();

app.use(cors())

app.listen(3000 , () => {
    console.log("Server Running")
})