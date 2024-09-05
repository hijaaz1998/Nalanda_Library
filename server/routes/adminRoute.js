import express from 'express';
import { createBook, deleteBook, updateBook } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/verifyToken.js';
import { roleCheck } from '../middlewares/verifyRole.js';

const adminRoute = express.Router();

// Apply authentication and role verification middleware to all routes under this router.
// Ensures that only authenticated users with the 'ADMIN' role can access the following routes.
adminRoute.use(authMiddleware, roleCheck('ADMIN'))

/**
 * @route POST /createBook
 * @description Route to create a new book entry.
 * @access Admin only
 * @middleware authMiddleware, roleCheck('ADMIN')
 */
adminRoute.post('/createBook', createBook)

/**
 * @route PUT /updateBook/:id
 * @description Route to update an existing book based on its ID.
 * @access Admin only
 * @middleware authMiddleware, roleCheck('ADMIN')
 */
adminRoute.put('/updateBook/:id', updateBook)

/**
 * @route DELETE /deleteBook/:id
 * @description Route to delete an existing book by its ID.
 * @access Admin only
 * @middleware authMiddleware, roleCheck('ADMIN')
 */
adminRoute.delete('/deleteBook/:id', deleteBook)

export default adminRoute;
