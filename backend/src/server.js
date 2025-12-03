import express from 'express';
import cors from 'cors';
import grillsRoutes from './routes/grillsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import { connectDB } from './Config/db.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
app.use(express.json()); // Parse JSON request bodies

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/grills", grillsRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});