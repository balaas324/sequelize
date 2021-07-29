const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 8080;

let corsOption = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOption))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models")

db.sequelize.sync()

app.get("/", (req, res)=>{
    res.json({ message: "welcome" })
})

require("./app/routes/user.routes")(app)

app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
})