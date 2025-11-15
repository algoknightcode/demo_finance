import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getAllExpenses,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expenseController.js";

const router = express.Router();

router.use(protect); // protect all expense routes

router.post("/add", addExpense);
router.get("/all", getAllExpenses);
router.delete("/:id", deleteExpense);
router.get("/download", downloadExpenseExcel);

export default router;