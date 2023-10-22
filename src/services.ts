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

export {createNewTask, deleteTaskById, getTasks, updateTaskInfo};

