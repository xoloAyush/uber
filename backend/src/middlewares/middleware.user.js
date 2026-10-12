import blackListTokenModel from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";

export const authUser = async (req, res, next) => {

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

    try {

        const decode = jwt.verify(token, process.env.JWT);
        const user = await userModel.findById(decode._id)

        req.user = user;

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

export const authCaptain = async (req, res, next) => {

    console.log("🔥 AUTH CAPTAIN HIT");

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

        

    try {

        const decode = jwt.verify(token, process.env.JWT);
        const user = await captainModel.findById(decode._id)

        if (!user) {
      return res.status(401).json({
        message: "Captain not found",
      });
    }

        req.user = user;

        console.log("🔥 CAPTAIN AUTHENTICATED:", req.user);

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
