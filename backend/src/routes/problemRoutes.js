import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";

const router = express.Router();

// all routes below require auth
router.use(auth);

router.post("/", createProblem);
router.get("/", getProblems);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

export default router;
