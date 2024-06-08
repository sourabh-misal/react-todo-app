const { todo } = require('./db');
const { createTodo, updateTodo } = require('./type');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/todos',async (req,res) => {
    const todos = await todo.find({});
    res.json({
        todos
    })
});

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(400).json({
            msg: "You have sent wrong input"
        });
        return;
    }

    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.json({
            msg: "Todo created"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});


app.put('/completed',async (req,res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg: " You have sent wrong input"
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    },{
        completed: true
    })
    res.json({
        msg:"todo marked as done"
    })

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});