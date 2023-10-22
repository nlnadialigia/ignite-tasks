
import {Router} from "express";
import * as c from "./controller";

const router = Router();

router.get("/tasks", c.tasksList);
router.post("/tasks", c.newTask);
router.put("/tasks/:id", c.updateTask);
router.delete("/tasks/:id", c.removeTask);
router.patch("/tasks/:id/complete", c.completeTask);

export default router;