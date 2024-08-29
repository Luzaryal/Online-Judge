import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const PORT = 3000;

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDB Connection Established');
})
.catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}!`);

});