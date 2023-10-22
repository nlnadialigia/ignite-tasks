import {IInfo} from "./model";
import {createTask, listTasks, searchTasksByDescription, searchTasksByTitle, updateTask} from "./repository";


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
  const response = await updateTask(info, id);

  return {status: 200, data: response};
};

export {createNewTask, getTasks, updateTaskInfo};

