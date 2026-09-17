import express from 'express'
import { registerUser, loginUser, getProfile, logout } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/middleware.user.js';

const router = express.Router()
import { body } from 'express-validator';

router.post('/register', [
    body('fullname.firstname').trim().notEmpty().withMessage('First name is required').isLength({ min: 3, max: 20 }).withMessage('First name must be at least 3 characters long'),

    body('email').trim().notEmpty().withMessage('Email is required').isLength({ min: 5, max: 30 }).withMessage('Email must be at least 5 characters long').isEmail().withMessage('Please enter a valid email address'),

    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6, max: 80 }).withMessage('Password must be at least 6 characters long'),

], registerUser)

router.post('/login', [
    body('email').trim().notEmpty().withMessage('Email is required').isLength({ min: 5, max: 30 }).withMessage('Email must be at least 5 characters long').isEmail().withMessage('Please enter a valid email address'),

    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6, max: 80 }).withMessage('Password must be at least 6 characters long')
], loginUser)

router.get('/profile', authUser, getProfile)

router.post('/logout', authUser, logout)

export default router