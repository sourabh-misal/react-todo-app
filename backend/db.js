
const mongoose = require('mongoose');
const { string } = require('zod');

mongoose.connect("mongodb+srv://admin123:oLYZ7OUoeBcLs7V6@cluster0.38jlucu.mongodb.net/Todo");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}