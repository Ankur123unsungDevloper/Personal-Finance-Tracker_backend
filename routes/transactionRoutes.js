import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getTransactions);
router.post("/", addTransaction);
router.delete("/:id", deleteTransaction);

export default router;
