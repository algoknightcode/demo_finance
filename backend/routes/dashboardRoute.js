import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardcontroller.js";
const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;
