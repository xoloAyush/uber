import blackListTokenModel from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {

    try {

        const cookieToken = req.cookies.token;
        const bearerToken = req.headers.authorization?.split(' ')[1];

        const cookie = cookieToken || bearerToken

        if (!cookie) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isBlacklisted = await blackListTokenModel.findOne({ token: cookie });

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decode = jwt.verify(cookie, process.env.JWT)
        req.user = decode._id

        next()

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }

}