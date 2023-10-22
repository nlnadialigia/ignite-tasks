import {createTask, listTasks, searchTasksByDescription, searchTasksByTitle} from "./repository";

const getTasks = async (type?: string) => {
  const searchFunctions: Record<string, (type: string) => Promise<any>> = {
    title: searchTasksByTitle,
    description: searchTasksByDescription,
    default: listTasks
  };

  const searchFunction = searchFunctions[type] || searchFunctions.default;

  const response = await searchFunction(type || "");

  return response.length === 0 ? { status: 204 } : { status: 200, data: response };
};

const createNewTask = async (title: string, description: string) => {
  const response = await createTask(title, description);

  return { status: 200, data: response };
};

export {createNewTask, getTasks};

