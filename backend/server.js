import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js'
import { initializeSocket } from './src/socket.js'
import http from 'http'

const PORT = process.env.PORT || 3001

const server = http.createServer(app)

initializeSocket(server)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
