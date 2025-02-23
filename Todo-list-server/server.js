const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const routes = require("./routes/route");

const app = express();

app.use(cors({
    origin: 'https://todolist-frontend-pink.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(routes);

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

module.exports = app;
