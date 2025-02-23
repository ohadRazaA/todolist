const { default: mongoose } = require("mongoose");
const todoModel = require("../model/todoModel");

const storeData = async (req, res) => {
    const myList = new todoModel({
        todoText: req.body.data
    })
    try {
        const dataToSave = await myList.save();
        res.send(dataToSave);
    }
    catch (err) {
        res.status(500).send(err)
    }
}
const showData = async (req, res) => {
    try {
        const allTodos = await todoModel.find();
        res.send(allTodos);
    }
    catch (err) {
        res.status(500).send(err)
    }
}
const deleteData = async (req, res) => {
    try {
        await todoModel.findByIdAndDelete({ _id: req.params.id });
    }
    catch (err) {
        res.status(500).send(err)
    }
}
const deleteAllData = async (req, res) => {
    try {
        await mongoose.connection.collections.todos.drop();
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    storeData,
    showData,
    deleteData,
    deleteAllData
}