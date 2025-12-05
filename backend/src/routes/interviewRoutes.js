import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.use(auth);

router.post("/", createInterview);
router.get("/", getInterviews);
router.put("/:id", updateInterview);
router.delete("/:id", deleteInterview);

export default router;
