import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ error: "Access token required" });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Invalid or expired token" });
            }

            // Attach user info to request
            req.userId = decoded.userId;
            req.userEmail = decoded.email;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
