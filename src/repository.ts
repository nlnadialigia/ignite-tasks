import {PrismaClient} from "@prisma/client";
import {IInfo} from "./model";

const prisma = new PrismaClient();

async function listTasks() {
  return prisma.task.findMany();
}

async function searchTasksByDescription(type: string) {
  return prisma.task.findMany({
    where: {
      description: {
        contains: type,
        mode: "insensitive"
      }
    }
  });
}

async function searchTasksByTitle(type: string) {
  return prisma.task.findMany({
    where: {
      title: {
        contains: type,
        mode: "insensitive"
      }
    }
  });
}

async function findTaskById(id: string) {
  return prisma.task.findUnique({
    where: {
      id: id,
    }
  });
}

async function createTask(title: string, description: string) {
  return prisma.task.create({
    data: {
      description: description,
      title: title
    }
  });
}

async function updateTask(info: IInfo, id: string) {
  return prisma.task.update({
    where: {id: id},
    data: info
  });
}

async function deleteTask(id: string) {
  return prisma.task.delete({
    where: {id: id}
  });
}

export {createTask, deleteTask, findTaskById, listTasks, searchTasksByDescription, searchTasksByTitle, updateTask};

