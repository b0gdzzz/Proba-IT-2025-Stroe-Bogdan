import Note from "../models/note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content, author } = req.body;
        const note = new Note({ title, content, author });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;
        
        const note = await Note.findByIdAndUpdate(
            id, 
            { title, content, author },
            { new: true, runValidators: true } // Return updated note & validate
        );
        
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        
        res.status(200).json({ message: "Note deleted successfully", deletedNote: note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
