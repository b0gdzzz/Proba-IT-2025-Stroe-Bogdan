import express from 'express';
import { getAllNotes, createNote, getNoteById, updateNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

// GET all notes
router.get("/", getAllNotes);

// POST create a new note
router.post("/", createNote);

// GET a single note by ID
router.get("/:id", getNoteById);

// PUT update a note by ID
router.put("/:id", updateNote);

// DELETE a note by ID
router.delete("/:id", deleteNote);

export default router;