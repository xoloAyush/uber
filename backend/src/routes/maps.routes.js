import express from 'express';
import { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } from '../controllers/maps.controller.js';
import { query } from "express-validator"
import { authUser } from '../middlewares/middleware.user.js';

const router = express.Router();

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUser,
    getCoordinates
);

router.get('/get-distance',
    query('origin').isString(),
    query('destination').isString(),
    authUser,
    getDistanceTime
)

router.get('/get-auto-complete-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,
    getAutoCompleteSuggestions
)

export default router;
