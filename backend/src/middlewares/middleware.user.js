import blackListTokenModel from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {

    try {

        const cookieToken = req.cookies?.token;
        const bearerToken = req.headers.authorization?.split(' ')[1];

        const token = bearerToken || cookieToken;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isBlacklisted = await blackListTokenModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decode = jwt.verify(token, process.env.JWT);
        req.user = decode._id;

        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Unauthorized: Invalid or expired token'
            });
        }
        res.status(500).json({
            message: error.message || "Internal server error"
        });
    }

}