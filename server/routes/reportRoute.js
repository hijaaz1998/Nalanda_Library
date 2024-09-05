import express from "express";
import { authMiddleware } from "../middlewares/verifyToken.js";
import { roleCheck } from "../middlewares/verifyRole.js";
import {
  getActiveMembers,
  getAvailableBooks,
  getMostBorrowedBooks,
} from "../controllers/reportController.js";

const reportRouter = express.Router();

// Apply authentication and role verification middleware to all routes under this router.
// Ensures that only authenticated users with the 'ADMIN' role can access the following routes.
reportRouter.use(authMiddleware, roleCheck("ADMIN"))

/**
 * @route GET /most_borrowed_books
 * @description Endpoint to retrieve the list of most borrowed books.
 * @access Admin only
 * @returns {Object} - Response with a list of most borrowed books.
 */
reportRouter.get("/most_borrowed_books", getMostBorrowedBooks)

/**
 * @route GET /active_users
 * @description Endpoint to retrieve the list of active members.
 * @access Admin only
 * @returns {Object} - Response with a list of active members.
 */
reportRouter.get("/active_users", getActiveMembers)

/**
 * @route GET /available_books
 * @description Endpoint to retrieve the list of available books.
 * @access Admin only
 * @returns {Object} - Response with a list of available books.
 */
reportRouter.get("/available_books", getAvailableBooks)

export default reportRouter;
