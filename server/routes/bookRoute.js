import express from 'express';
import { borrowBook, borrowHistory, listBooks, returnBook } from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/verifyToken.js';

const bookRoute = express.Router();

bookRoute.use(authMiddleware)

bookRoute.get('/booklist', listBooks);
bookRoute.post('/borrow/:id', borrowBook);
bookRoute.put('/return/:id', returnBook);
bookRoute.get('/history', borrowHistory)


export default bookRoute