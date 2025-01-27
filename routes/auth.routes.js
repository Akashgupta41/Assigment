import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import {validateRequest} from '../middlewares/validation.middleware.js'

const router = express.Router();

// Registration Route
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],validateRequest, registerUser);

// Login Route
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
],validateRequest, loginUser);

export default router;
