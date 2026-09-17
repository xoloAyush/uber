import { validationResult } from "express-validator"
import { createCaptain } from "../services/captain.service.js"
import captainModel from "../models/captain.model.js"

export async function captainRegister(req, res) {

    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg)
        }

        const { fullname, email, password, vehicle } = req.body

        const existCaptain = await captainModel.findOne({ email })

        if (existCaptain) {
            return res.status(400).json({ message: "Captain already exists" })
        }

        const hashedPassword = await captainModel.generateHashPassword(password)

        const newCaptain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })

        const token = newCaptain.generateAuthToken()

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
            success: true,
            message: "Captain created successfully",
            data: newCaptain,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}


export async function loginCaptain(req, res, next) {

    try {

        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg)
        }

        const { email, password } = req.body

        const captainExist = await captainModel.findOne({ email }).select('+password')

        if (!captainExist) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const matchPassword = await captainExist.comparePassword(password)

        if (!matchPassword) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Remove password from Mongoose document
        captainExist.password = undefined;

        const token = captainExist.generateAuthToken()

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "Captain logged in successfully",
            data: captainExist,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "Internal server error"
        })

    }

}