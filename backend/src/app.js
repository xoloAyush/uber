import express from 'express';
import connectDB from './db/db.js';
import dns from 'dns';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import captainRoutes from './routes/captain.route.js';


dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

export default app;