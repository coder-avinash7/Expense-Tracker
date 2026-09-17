const express = require("express");

const { Protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    registerUser,
    loginUser,
    googleLogin,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// ===============================
// REGISTER
// ===============================

router.post("/register", registerUser);

// ===============================
// LOGIN
// ===============================

router.post("/login", loginUser);

// ===============================
// GOOGLE LOGIN
// ===============================

router.post("/google", googleLogin);

// ===============================
// GET USER INFO
// ===============================

router.get("/getUser", Protect, getUserInfo);

// ===============================
// UPLOAD PROFILE IMAGE
// ===============================

router.post(
    "/upload-image",
    upload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                message: "No File Uploaded",
            });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        res.status(200).json({
            imageUrl,
        });
    }
);

module.exports = router;