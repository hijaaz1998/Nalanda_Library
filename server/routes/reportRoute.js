import express from "express";
import { authMiddleware } from "../middlewares/verifyToken.js";
import { roleCheck } from "../middlewares/verifyRole.js";
import {
  getActiveMembers,
  getAvailableBooks,
  getMostBorrowedBooks,
} from "../controllers/reportController.js";

const reportRouter = express.Router();

reportRouter.use(authMiddleware, roleCheck("ADMIN"));

reportRouter.get("/most_borrowed_books", getMostBorrowedBooks);
reportRouter.get("/active_users", getActiveMembers);
reportRouter.get("/available_books", getAvailableBooks);

export default reportRouter;
