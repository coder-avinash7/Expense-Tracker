const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();

        res.status(200).json(newIncome);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        res.status(200).json(income);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);

        res.json({
            message: "Income deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        // Create workbook
        const wb = xlsx.utils.book_new();

        // Create worksheet
        const ws = xlsx.utils.json_to_sheet(data);

        // Add worksheet to workbook
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Generate Excel file in memory
        const excelBuffer = xlsx.write(wb, {
            bookType: "xlsx",
            type: "buffer"
        });

        // Send Excel file to browser
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="income_details.xlsx"'
        );

        res.status(200).send(excelBuffer);

    } catch (error) {
        console.error("Error downloading income Excel:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
