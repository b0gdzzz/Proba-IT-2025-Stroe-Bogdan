import Grill from "../models/grill.js";

export async function getAllGrills(req, res) {
    try {
        const grills = await Grill.find()
            .populate('creator', 'username name email')
            .sort({ createdAt: -1 });
        res.status(200).json(grills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createGrill(req, res) {
    try {
        const { name, description, location } = req.body;
        
        const grill = new Grill({ 
            name, 
            description,
            location,
            creator: req.userId, // From auth middleware
            likes: []
        });
        
        await grill.save();
        
        // Populate creator info before sending response
        await grill.populate('creator', 'username name email');
        
        res.status(201).json(grill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getGrillById(req, res) {
    try {
        const grill = await Grill.findById(req.params.id)
            .populate('creator', 'username name email');
            
        if (!grill) {
            return res.status(404).json({ error: "Grill not found" });
        }
        res.status(200).json(grill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateGrill(req, res) {
    try {
        const { id } = req.params;
        const { name, description, location } = req.body;
        
        // Find grill first to check ownership
        const grill = await Grill.findById(id);
        
        if (!grill) {
            return res.status(404).json({ error: "Grill not found" });
        }
        
        // Check if user is the creator
        if (grill.creator.toString() !== req.userId) {
            return res.status(403).json({ error: "Not authorized to update this grill" });
        }
        
        const updatedGrill = await Grill.findByIdAndUpdate(
            id, 
            { name, description, location },
            { new: true, runValidators: true }
        ).populate('creator', 'username name email');
        
        res.status(200).json(updatedGrill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteGrill(req, res) {
    try {
        const { id } = req.params;
        
        const grill = await Grill.findById(id);
        
        if (!grill) {
            return res.status(404).json({ error: "Grill not found" });
        }
        
        // Check if user is the creator
        if (grill.creator.toString() !== req.userId) {
            return res.status(403).json({ error: "Not authorized to delete this grill" });
        }
        
        await Grill.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Grill deleted successfully", deletedGrill: grill });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Toggle like on a grill
export async function toggleLike(req, res) {
    try {
        const { id } = req.params;
        const userId = req.userId;
        
        const grill = await Grill.findById(id);
        
        if (!grill) {
            return res.status(404).json({ error: "Grill not found" });
        }
        
        // Check if user already liked this grill
        const likeIndex = grill.likes.indexOf(userId);
        
        if (likeIndex > -1) {
            // User already liked - remove like
            grill.likes.splice(likeIndex, 1);
        } else {
            // User hasn't liked - add like
            grill.likes.push(userId);
        }
        
        await grill.save();
        await grill.populate('creator', 'username name email');
        
        res.status(200).json({
            message: likeIndex > -1 ? "Like removed" : "Like added",
            grill,
            likeCount: grill.likes.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getLeaderboard(req, res) {
    try {
        const topGrills = await Grill.find()
            .populate('creator', 'username name email')
            .sort({ likes: -1 }) // Sort by number of likes descending
            .limit(3);
            
        res.status(200).json(topGrills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
