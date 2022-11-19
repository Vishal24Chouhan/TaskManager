import { Router } from "express";
import { getAllTasks, createTask, getTask, updateTask, deleteTask } from "../controllers/tasks.js";

const taskRouter = Router();

taskRouter.get('', getAllTasks);
taskRouter.post('', createTask);
taskRouter.get('/:id', getTask);
taskRouter.patch('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;