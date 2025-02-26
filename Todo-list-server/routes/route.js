const express = require("express");
const  todoController = require("../Controller/todoListController")
const route = express.Router();

route.post("/", todoController.storeData);
route.get("/", todoController.showData);
route.delete("/:id", todoController.deleteData);
route.put("/", todoController.deleteAllData);

module.exports = route;