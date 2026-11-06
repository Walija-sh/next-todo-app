import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        required:true,
    }
}, {
    toJSON: {
        virtuals: true
    }
});

const Todo = mongoose.models.Todo ||
    mongoose.model("Todo", todoSchema);

export default Todo;
