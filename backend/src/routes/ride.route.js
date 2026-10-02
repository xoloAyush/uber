import express from 'express';
import { body, query } from "express-validator"
import { authUser } from '../middlewares/middleware.user.js';

import { createRide, getFare } from '../controllers/ride.controller.js';

const router = express.Router();

router.post('/create', [
    // body('userId').trim().notEmpty().withMessage('User ID is required').isLength({ min: 3, max: 20 }).withMessage('User ID must be at least 3 characters long'),

    body('pickup').trim().notEmpty().withMessage('Pickup is required').isLength({ min: 3, max: 200 }).withMessage('Pickup must be at least 3 characters long'),

    body('destination').trim().notEmpty().withMessage('Destination is required').isLength({ min: 3, max: 200 }).withMessage('Destination must be at least 3 characters long'),

    body('vehicleType').trim().notEmpty().withMessage('Vehicle type is required').isLength({ min: 3, max: 20 }).withMessage('Vehicle type must be at least 3 characters long'),

], authUser, createRide);

router.get('/get-fare',
    authUser,

    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),

    getFare
)

export default router;