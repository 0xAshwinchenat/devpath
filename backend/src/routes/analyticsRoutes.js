import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getProblemAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.use(auth);

router.get("/problems", getProblemAnalytics);

export default router;
