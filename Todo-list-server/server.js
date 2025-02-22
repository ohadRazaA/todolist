const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const routes = require("./routes/route");

app.use(cors({
    origin: 'app.use(cors({
  origin: 'http://yourfrontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
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

app.listen(process.env.PORT, () => { console.log("Server is started") });