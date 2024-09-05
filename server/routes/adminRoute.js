import express from 'express';
import { createBook, deleteBook, updateBook } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/verifyToken.js';
import { roleCheck } from '../middlewares/verifyRole.js';

const adminRoute = express.Router();

adminRoute.use(authMiddleware, roleCheck('ADMIN'))

adminRoute.post('/createBook', createBook)
adminRoute.put('/updateBook/:id', updateBook)
adminRoute.delete('/deleteBook/:id', deleteBook)


export default adminRoute