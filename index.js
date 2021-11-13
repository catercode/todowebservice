import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import TodoModel from "./schemas/todo_schemas.js";

dotenv.config()

const app = express();
app.use(express.json());

const port = 5000;
const db = 'mongodb://localhost/todo'

//database LOCAL connection
// mongoose.connect('mongodb://localhost/tododb', {
//     //useNewUrlPerser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("connect to mongodb")
// }).catch((err) => {
//     console.log("err");
// })

//database ONLINE connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connect to mongodb")
}).catch((err) => {
    console.log(err);
})


app.get('/todos', async (req, res) => {
    const todoModel = await TodoModel.find({});
    if (todoModel) {
        return res.status(200).json({
            status: true,
            message: 'todo fetch successfullvy',
            data: todoModel

        });
    } else {
        return res.status(400).json({
            status: false,
            message: 'todo fetch failed',
            data: todoModel

        });
    }

});
//get one todo
app.get('/todos/:id', async (req, res) => {
    const { id, name } = req.params;
    const todoModel = await TodoModel.findById({ _id: id });
    if (todoModel) {
        return res.status(200).json({
            status: true,
            message: 'todo fetch successfully',
            data: todoModel

        });
    } else {
        return res.status(400).json({
            status: false,
            message: 'todo fetch failed',
            data: todoModel

        });
    }
});
// create todo
app.post('/todos', async (req, res) => {

    const { title, description } = req.body;
    const todoModel = await TodoModel.create(
        {
            title,
            description


        })

    if (todoModel) {
        return res.status(200).json({
            status: true,
            message: 'todo fetch successfully',
            data: todoModel

        });
    } else {
        return res.status(400).json({
            status: false,
            message: 'todo fetch failed',
            data: todoModel

        });
    }
});

// Patch todo
app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { change } = req.body;
    const todo = await TodoModel.findByIdAndUpdate({ change }).where({ _id: id });

    if (todo) {
        return res.status(200).json({
            status: true,
            message: "todo update",
            data: todo,
        })
    } else {
        return res.status(400).json({
            status: false,
            message: 'todo not update'
        });
    }

});
//Delete todo
app.delete('/todos/:id', async (req, res) => {
    const todo = await TodoModel.findByIdAndDelete(req.params.id);
    if (todo) {
        return res.status(200).json({
            status: true,
            message: "todo delete",
            data: todo
        })
    } return res.status(400).json({
        message: 'Delete todo'
    });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

