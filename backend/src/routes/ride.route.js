import express from 'express';
import { body, query } from "express-validator"
import { authUser, authCaptain } from '../middlewares/middleware.user.js';

import { createRide, getFare, confirmRide, startRide, endRide } from '../controllers/ride.controller.js';

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

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    confirmRide
)

router.get(
    '/start-ride',
    (req, res, next) => {
        console.log("🔥🔥 START-RIDE ROUTE HIT 🔥🔥");
        console.log("QUERY:", req.query);
        next();
    },
    authCaptain,
    query('rideId')
        .isMongoId()
        .withMessage('Invalid ride id'),
    query('otp')
        .isString()
        .isLength({ min: 6, max: 6 })
        .withMessage('Invalid OTP'),
    startRide
);

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)

export default router;