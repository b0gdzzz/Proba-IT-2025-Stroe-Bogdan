import User from "../models/user.js";
import Grill from "../models/grill.js";

// Get all grills created by a specific user
export async function getUserGrills(req, res) {
    try {
        const { id } = req.params;
        
        // Verify user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // Get all grills created by this user
        const grills = await Grill.find({ creator: id })
            .populate('creator', 'username name email')
            .sort({ createdAt: -1 }); // Newest first
        
        res.status(200).json(grills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
