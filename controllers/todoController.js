const Todo = require("../models/Todo");

exports.addTodo = async (req, res) => {
    try {
        const { title, checked, position } = req.body;
        console.log(title);
        const newTodo = new Todo({
            title: title,
            position: position,
            checked: checked
        })

        await newTodo.save();

        return res.status(200).json({
            message: "Todo added successsfully!"
        })
    } catch (error) {
        console.log("Server Error");
    }
}

exports.deleteTodo = (req, res) => {
    try {

    } catch (error) {

    }
}

exports.updateTodo = () => {
    try {

    } catch (error) {

    }
}


exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
