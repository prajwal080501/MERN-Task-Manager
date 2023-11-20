const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // description: {
    //     type: String
    // },
    position:Number,
    checked: Boolean
}, {
    timestamps: true
})

const Todo  = new mongoose.model("Todo", TodoSchema);

module.exports = Todo;