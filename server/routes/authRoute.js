import express from 'express';
import { login, register } from '../controllers/authController.js';

const authRoute = express.Router();

// Route to handle user registration
/**
 * @route POST /register
 * @description Endpoint for user registration.
 * @body {Object} - Request body should contain user registration details.
 * @returns {Object} - Response with registration success or failure message.
 */
authRoute.post('/register', register)

// Route to handle user login
/**
 * @route POST /login
 * @description Endpoint for user login.
 * @body {Object} - Request body should contain user login credentials.
 * @returns {Object} - Response with login success or failure message and user token.
 */
authRoute.post('/login', login)

export default authRoute;
