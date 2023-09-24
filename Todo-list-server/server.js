const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const routes = require("./routes/route");

app.use(cors());
app.use(express.json());
app.use(routes);

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
})

database.once("connected", () => {
    console.log("Database Connected");
});

app.listen(PORT, () => { console.log("Server is started") });