
import { Server } from 'socket.io'

import user from './models/user.model.js'
import captain from './models/captain.model.js'
import captainModel from './models/captain.model.js'

let io

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173",
                "https://373wcwgx-5173.inc1.devtunnels.ms"],
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on('connection', (socket) => {

        console.log("New Client Connected", socket.id)

        socket.on('join', async (data) => {

            const { userId, userType } = data

            if (userType == 'user') {
                await user.findByIdAndUpdate(userId, { socketId: socket.id })
            }

            if (userType == 'captain') {
                await captain.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        })

        socket.on('update-location-captain', async (data) => {

            const { userId, location } = data

            if (!location || !location.ltd || !location.lng) {

                return socket.emit('error', { message: 'Invalid location' })
            }

            await captainModel.findByIdAndUpdate(userId, {
                location:
                {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log("Client Disconnected")
        })
    })

    return io
}

export const sendMessageToSocketId = (socketId, messageObject) => {

    console.log("Sending message to socketId:", socketId, "with event:", messageObject.event, "and data:", messageObject.data);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data)
    }
    else{
        console.error("Socket.io is not initialized. Cannot send message.")
    }

    return io;
};