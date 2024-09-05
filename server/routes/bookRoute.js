import express from 'express';
import { borrowBook, borrowHistory, listBooks, returnBook } from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/verifyToken.js';

const bookRoute = express.Router();

// Apply authentication middleware to all routes under this router.
// Ensures that only authenticated users can access the following routes.
bookRoute.use(authMiddleware)

/**
 * @route GET /booklist
 * @description Endpoint to retrieve the list of all available books.
 * @access Authenticated users only
 * @returns {Object} - Response with a list of books.
 */
bookRoute.get('/booklist', listBooks)

/**
 * @route POST /borrow/:id
 * @description Endpoint to borrow a book by its ID.
 * @access Authenticated users only
 * @param {string} id - The ID of the book to borrow.
 * @returns {Object} - Response with borrow success or failure message.
 */
bookRoute.post('/borrow/:id', borrowBook)

/**
 * @route PUT /return/:id
 * @description Endpoint to return a borrowed book by its ID.
 * @access Authenticated users only
 * @param {string} id - The ID of the book to return.
 * @returns {Object} - Response with return success or failure message.
 */
bookRoute.put('/return/:id', returnBook)

/**
 * @route GET /history
 * @description Endpoint to retrieve the borrow history of the authenticated user.
 * @access Authenticated users only
 * @returns {Object} - Response with the user's borrow history.
 */
bookRoute.get('/history', borrowHistory)

export default bookRoute;
