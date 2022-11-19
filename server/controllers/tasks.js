import task from "../models/tasks.js";

//Get All Tasks
export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await task.find({});
        res.status(200).send(allTasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Create New Task
export const createTask = async (req, res) => {
    const {name} = req.body;
    try {
        if(name){
            const newTask = await task.create({
                name: name
            });
            res.status(201).send(newTask);
        } else {
            res.status(400).send("Name is Required");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//Get One Task
export const getTask = async (req, res) => {
    try {
        const getSingleTask = await task.findById(req.params.id);
        res.status(200).send(getSingleTask);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Patch a Task
export const updateTask = async (req, res) => {
    const { name, completed } = req.body;
    try {
        const existingTask = await task.findById(req.params.id);

        if(existingTask){
            if(name&&completed){
                await task.findByIdAndUpdate(req.params.id, {
                    name: name,
                    completed: completed
                })
                return res.status(200).send("Name and Status Updated");
            }
            else if(name) {
                await task.findByIdAndUpdate(req.params.id, {
                    name: name
                })
                return res.status(200).send("Name Updated");
            }
            else if(completed) {
                await task.findByIdAndUpdate(req.params.id, {
                    completed: completed
                })
                return res.status(200).send("Status Updated");
            } else {
                res.status(400).send("No Task exists with Given ID")
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//Delete a Task
export const deleteTask = async (req, res) => {
    try {
        await task.findByIdAndDelete(req.params.id);
        res.status(200).send("Task Deleted") 
    } catch (error) {
        res.status(500).send(error)
    }
}