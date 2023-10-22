import csv from "fast-csv";
import fs from "fs";
import {IInfo} from "./model";
import {createTask, deleteTask, findTaskById, listTasks, searchTasksByDescription, searchTasksByTitle, updateTask} from "./repository";

const getTasks = async (title?: string, description?: string) => {
  let response;

  if (title) {
    response = await searchTasksByTitle(title);
  } else if (description) {
    response = await searchTasksByDescription(description);
  } else {
    response = await listTasks();
  }

  return response.length === 0 ? { status: 204 } : { status: 200, data: response };
};

const createNewTask = async (title: string, description: string) => {
  const response = await createTask(title, description);

  return { status: 200, data: response };
};

const updateTaskInfo = async (info: IInfo, id: string) => {
  const validateTask = await findTaskById(id);

  if (validateTask === null) {
    return {status: 404, data: "Task does not exist"};
  }

  const response = await updateTask(info, id);

  return {status: 200, data: response};
};

const deleteTaskById = async (id: string) => {
  const validateTask = await findTaskById(id);

  if (validateTask === null) {
    return {status: 404, data: "Task does not exist"};
  }

  await deleteTask(id);

  return {status: 204, data: "Task deleted!"};
};

const completeTaskById = async (id: string, done: boolean) => {
  const validateTask = await findTaskById(id);

  if (validateTask === null) {
    return {status: 404, data: "Task does not exist"};
  }

  const today = new Date(Date.now());
  const info = done ? {completedAt: today} : {completedAt: null};

  const response = await updateTask(info, id);

  return {status: 200, data: response};
};

const uploadTasks = async (file: any) => {
  try {
    const results: IInfo[] = [];
  
    fs.createReadStream(file.path)
      .pipe(csv.parse({ headers: true }))
      .on("data", (data) => results.push(data))
      .on("end", () => {
        fs.unlinkSync(file.path);
      });

    console.log(results);
  
    for (const {title, description} of results) {
      await createTask(title, description);
    }
  
    return true;
  } catch (error) {
    throw new Error("Something is wrong! ", error);
  }
};

export {completeTaskById, createNewTask, deleteTaskById, getTasks, updateTaskInfo, uploadTasks};

