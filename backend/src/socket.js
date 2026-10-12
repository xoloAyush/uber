
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

        socket.on("join", async (data) => {

    const { userId, userType } = data;

    console.log("🔥 JOIN EVENT:", {
        userId,
        userType,
        socketId: socket.id
    });

    if (userType === "user") {

        const updatedUser =
            await user.findByIdAndUpdate(
                userId,
                { socketId: socket.id },
                { new: true }
            );

        console.log(
            "User socket saved:",
            updatedUser?.socketId
        );
    }

    if (userType === "captain") {

        const updatedCaptain =
            await captain.findByIdAndUpdate(
                userId,
                { socketId: socket.id },
                { new: true }
            );

        console.log(
            "Captain socket saved:",
            updatedCaptain?.socketId
        );
    }
});

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

    console.log("📤 Sending:", {
        socketId,
        event: messageObject.event
    });

    if (!io) {
        console.log("❌ Socket.io not initialized");
        return;
    }

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }

    console.log("✅ Event sent successfully");
};