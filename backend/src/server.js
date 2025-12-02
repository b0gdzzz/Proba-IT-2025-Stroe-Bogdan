import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
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

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});