import {Request, Response} from "express";
import {completeTaskById, createNewTask, deleteTaskById, getTasks, updateTaskInfo} from "./services";

const tasksList = async (req: Request, res: Response) => {
  try {
    const {title, description} = req.body;
    const {status, data} = await getTasks(title, description);
  
    res.status(status).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const newTask = async (req: Request, res: Response) => {
  try {
    const {title,description} = req.body;

    const {status, data} = await createNewTask(title, description);
  
    res.status(status).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({message: "Fields are required"});
    }

    const {status, data} = await updateTaskInfo(req.body, id);
  
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const removeTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const {status, data} = await deleteTaskById(id);
  
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const completeTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {done} = req.body;

    const {status, data} = await completeTaskById(id, done);
  
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {completeTask, newTask, removeTask, tasksList, updateTask};

