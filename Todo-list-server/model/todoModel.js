const express = require("express");
const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema({
    todoText: {
        require: true,
        type: String
    }
});

const todoListModel = new mongoose.model("todos", todoListSchema);

module.exports = todoListModel;