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

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        // Check if the todo exists
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.status(200).json({
            todo: todo,
            message: "Todo deleted successfully!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      console.log("Todo Updated Successfully!");
      return res.status(200).json({
        todo: todo,
        message: "Todo Updated Successfully!"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  };
  


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
