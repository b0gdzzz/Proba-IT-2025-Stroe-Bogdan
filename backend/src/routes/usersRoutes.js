import express from 'express';
import { getUserGrills } from '../controllers/usersController.js';

const router = express.Router();

// Public route - get all grills created by a specific user
router.get("/:id/grills", getUserGrills);

export default router;
