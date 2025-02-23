const express = require("express");
const  todoController = require("../Controller/todoListController")
const route = express.Router();

route.post("/api/", todoController.storeData);
route.get("/api/", todoController.showData);
route.delete("/api/:id", todoController.deleteData);
route.put("/api/", todoController.deleteAllData);

module.exports = route;