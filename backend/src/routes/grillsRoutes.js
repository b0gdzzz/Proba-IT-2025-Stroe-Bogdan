import express from 'express';
import { 
    getAllGrills, 
    createGrill, 
    getGrillById, 
    updateGrill, 
    deleteGrill,
    toggleLike,
    getLeaderboard
} from '../controllers/grillsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get("/", getAllGrills);
router.get("/leaderboard", getLeaderboard);
router.get("/:id", getGrillById);

// Protected routes (require authentication)
router.post("/", authenticateToken, createGrill);
router.put("/:id", authenticateToken, updateGrill);
router.delete("/:id", authenticateToken, deleteGrill);
router.post("/:id/like", authenticateToken, toggleLike);

export default router;
