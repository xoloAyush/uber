import { getAddressCoordinate, getDistance, getAutoCompleteSuggestion } from '../services/maps.service.js'
import { validationResult } from 'express-validator'

export const getCoordinates = async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() })
    }

    const { address } = req.query

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}



export const getDistanceTime = async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() })
    }

    const { origin, destination } = req.query

    try {
        const distance = await getDistance(origin, destination);
        res.status(200).json(distance);
    } catch (error) {
        res.status(404).json({ message: 'Distance not found' });
    }
}

export const getAutoCompleteSuggestions = async (req, res) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() })
    }

    const { input } = req.query

    try {
        const suggestions = await getAutoCompleteSuggestion(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error in getAutoCompleteSuggestions:", error);
        res.status(404).json({ message: 'Suggestions not found' });
    }
}