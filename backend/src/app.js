import express from 'express';
import connectDB from './db/db.js';
import dns from 'dns';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import captainRoutes from './routes/captain.route.js';
import mapRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/ride.route.js';

dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);

connectDB();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://373wcwgx-5173.inc1.devtunnels.ms"
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(cookieParser())

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

export default app;