import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './Config/db.js';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});