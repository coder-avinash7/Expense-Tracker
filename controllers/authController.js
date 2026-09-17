const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

// ==========================================
// GOOGLE CLIENT
// ==========================================

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

// ==========================================
// Generate JWT token
// ==========================================

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

// ==========================================
// Register User
// ==========================================

exports.registerUser = async (req, res) => {
    const {
        fullName,
        email,
        password,
        profileImageUrl
    } = req.body;

    // Validation
    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use"
            });
        }

        // Create user
        const newUser = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: newUser._id,
            user: newUser,
            token: generateToken(newUser._id)
        });

    } catch (err) {
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        });
    }
};

// ==========================================
// Login User
// ==========================================

exports.loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (
            !user ||
            !(await user.comparePassword(password))
        ) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (err) {
        res.status(500).json({
            message: "Error Login user",
            error: err.message
        });
    }
};

// ==========================================
// GOOGLE LOGIN
// ==========================================

exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        // Check credential
        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required"
            });
        }

        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const {
            email,
            name,
            picture,
            sub
        } = payload;

        if (!email) {
            return res.status(400).json({
                message: "Google account email not available"
            });
        }

        // Find existing user
        let user = await User.findOne({ email });

        // ======================================
        // Existing User
        // ======================================

        if (user) {

            // Update profile image if available
            if (picture && user.profileImageUrl !== picture) {
                user.profileImageUrl = picture;
                await user.save();
            }

        } else {

            // ======================================
            // Create New Google User
            // ======================================

            const randomPassword = crypto
                .randomBytes(32)
                .toString("hex");

            user = await User.create({
                fullName: name || "Google User",
                email,
                password: randomPassword,
                profileImageUrl: picture || null
            });
        }

        // ======================================
        // Generate Application JWT
        // ======================================

        const token = generateToken(user._id);

        res.status(200).json({
            id: user._id,
            user,
            token
        });

    } catch (err) {

        console.error("Google Login Error:", err);

        res.status(500).json({
            message: "Google login failed",
            error: err.message
        });
    }
};

// ==========================================
// Get User Info
// ==========================================

exports.getUserInfo = async (req, res) => {

    try {

        const user = await User
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (err) {

        res.status(500).json({
            message: "Error in getting user information",
            error: err.message
        });
    }
};