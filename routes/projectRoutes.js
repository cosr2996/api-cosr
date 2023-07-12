import Express from "express";
import { newProject, getProjects ,deleteProject,updateProject,getProject} from "../controllers/projectController.js";

const router = Express.Router();
router.route("/").get(getProjects).post(newProject);

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject)

export default router;
