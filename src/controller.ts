import {Request, Response} from "express";
import {createNewTask, getTasks} from "./services";

const tasksList = async (req: Request, res: Response) => {
  try {
    const {status, data} = await getTasks(req.body);
  
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

export {newTask, tasksList};

