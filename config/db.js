// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {});
//         console.log("MongoDB Connected");
//     } catch (error) {
//         console.log("Error connecting to MongoDB", err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB Connected");
    } catch (error) { // The error object is named 'error'
        // FIX: Change 'err' to 'error'
        console.log("Error connecting to MongoDB", error); 
        process.exit(1);
    }
};

module.exports = connectDB;