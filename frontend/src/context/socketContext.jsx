import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            auth: {
                token: token
            },
            withCredentials: true
        });

        // Connection successful
        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
        });

        // Connection error
        newSocket.on("connect_error", (error) => {
            console.log("Socket connection error:", error.message);
        });

        // Disconnected
        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        setSocket(newSocket);

        // Cleanup
        return () => {
            newSocket.disconnect();
        };

    }, []);

    // Send message/event
    const sendMessage = (event, data) => {

        if (!socket) {
            console.log("Socket not connected");
            return;
        }

        console.log("Sending message:", event, data);
        socket.emit(event, data);
    };

    // Receive message/event
    const receiveMessage = (event, callback) => {

        if (!socket) {
            console.log("Socket not connected");
            return;
        }

        socket.on(event, callback);

        // Return cleanup function
        return () => {
            socket.off(event, callback);
        };
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                sendMessage,
                receiveMessage
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;