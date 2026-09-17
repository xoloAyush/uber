import userModel from "../models/user.model.js"
import { createUser } from "../services/user.service.js"
import { validationResult } from 'express-validator'

export async function registerUser(req, res, next) {

    try {

        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg)
        }

        const { fullname, email, password } = req.body

        const userExist = await userModel.findOne({ email })

        if (userExist) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await userModel.generateHashPassword(password)

        const newUser = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        })

        const token = newUser.generateAuthToken()

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "Internal server error"
        })

    }

}

export async function loginUser(req, res, next) {

    try {

        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg)
        }

        const { email, password } = req.body

        const userExist = await userModel.findOne({ email }).select('+password')

        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const matchPassword = await userExist.comparePassword(password)

        if (!matchPassword) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Remove password from Mongoose document
        userExist.password = undefined;

        const token = userExist.generateAuthToken()

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: userExist,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "Internal server error"
        })

    }

}