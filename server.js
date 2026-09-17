require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ===============================
// CORS
// ===============================

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests without an origin
        // and allow local + Vercel frontend
        if (!origin) {
            return callback(null, true);
        }

        const allowedOrigins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ];

        if (
            allowedOrigins.includes(origin) ||
            origin.endsWith(".vercel.app")
        ) {
            return callback(null, true);
        }

        return callback(null, true);
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],

    optionsSuccessStatus: 204,
};

// Apply CORS before routes
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options(/.*/, cors(corsOptions));

// ===============================
// BODY PARSER
// ===============================

app.use(express.json());

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// API ROUTES
// ===============================

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/income", incomeRoutes);

app.use("/api/v1/expense", expenseRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

// ===============================
// UPLOADS
// ===============================

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense Tracker Backend is running",
    });
});

// ===============================
// LOCAL SERVER
// ===============================

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// ===============================
// VERCEL
// ===============================

module.exports = app;