import { captainRegister, loginCaptain, getProfile, logout } from '../controllers/captain.controller.js';
import express from 'express';
import { body } from "express-validator"
import { authUser } from '../middlewares/middleware.user.js';

const router = express.Router();

router.post('/register', [
    body('fullname.firstname').trim().notEmpty().withMessage('First name is required').isLength({ min: 3, max: 20 }).withMessage('First name must be at least 3 characters long'),

    body('email').trim().notEmpty().withMessage('Email is required').isLength({ min: 5, max: 30 }).withMessage('Email must be at least 5 characters long').isEmail().withMessage('Please enter a valid email address'),

    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6, max: 80 }).withMessage('Password must be at least 6 characters long'),

    body('status').trim().notEmpty().withMessage('Status is required').isLength({ min: 3, max: 20 }).withMessage('Status must be at least 3 characters long'),

    body('vehicle.color').trim().notEmpty().withMessage('Color is required').isLength({ min: 3, max: 20 }).withMessage('Color must be at least 3 characters long'),

    body('vehicle.plate').trim().notEmpty().withMessage('Plate is required').isLength({ min: 3, max: 20 }).withMessage('Plate must be at least 3 characters long'),

    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),

    body('vehicle.vehicleType').trim().notEmpty().withMessage('Vehicle type is required').isLength({ min: 3, max: 20 }).withMessage('Vehicle type must be at least 3 characters long'),

], captainRegister)

router.post('/login', [
    body('email').trim().notEmpty().withMessage('Email is required').isLength({ min: 5, max: 30 }).withMessage('Email must be at least 5 characters long').isEmail().withMessage('Please enter a valid email address'),

    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6, max: 80 }).withMessage('Password must be at least 6 characters long')
], loginCaptain)

router.get('/profile',authUser, getProfile)

router.post('/logout', authUser, logout)

export default router;