import captain from '../models/captain.model.js'

export const createCaptain = async ({
    firstname, lastname, email, password, color, plate, model, capacity, vehicleType
}) => {

    if (!firstname || !email || !password || !color || !plate || !model || !capacity || !vehicleType) {
        throw new Error("All fields are required")
    }

    const newCaptain = await captain.create({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { color, plate, model, capacity, vehicleType }
    })

    return newCaptain

}