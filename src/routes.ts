
import {Router} from "express";
import multer from "multer";
import * as c from "./controller";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/tasks", c.tasksList);
router.post("/tasks", c.newTask);
router.put("/tasks/:id", c.updateTask);
router.delete("/tasks/:id", c.removeTask);
router.patch("/tasks/:id/complete", c.completeTask);
router.post("/upload", upload.single("file"), c.uploadTasksFile);

export default router;