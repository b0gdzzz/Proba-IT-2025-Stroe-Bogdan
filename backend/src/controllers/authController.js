import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new user
export async function register(req, res) {
    try {
        const { email, password, username, name, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                error: "User with this email or username already exists" 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword,
            username,
            name,
            phone
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login user
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get current user profile
export async function getProfile(req, res) {
    try {
        // req.userId is set by auth middleware
        const user = await User.findById(req.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
