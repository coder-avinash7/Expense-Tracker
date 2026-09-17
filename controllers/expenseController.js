const xlsx = require("xlsx");
const Expense = require("../models/Expense");


// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        // FIX: Changed 'catagory' to 'category' to match the schema
        const { icon, category, amount, date } = req.body;

        // Validation: check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();

        res.status(200).json(newExpense);

    } catch (error) {

        console.error("Expense add error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Get All Expense Source
exports.getAllExpense = async (req, res) => {

    const userId = req.user.id;

    try {

        const expense = await Expense
            .find({ userId })
            .sort({ date: -1 });

        res.status(200).json(expense);

    } catch (error) {

        console.error("Get expense error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Delete Expense Source
exports.deleteExpense = async (req, res) => {

    try {

        await Expense.findByIdAndDelete(req.params.id);

        res.json({
            message: "Expense deleted successfully."
        });

    } catch (error) {

        console.error("Delete expense error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Download Excel
exports.downloadExpenseExcel = async (req, res) => {

    const userId = req.user.id;

    try {

        const expense = await Expense
            .find({ userId })
            .sort({ date: -1 });


        // Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));


        // Create workbook
        const wb = xlsx.utils.book_new();


        // Create worksheet
        const ws = xlsx.utils.json_to_sheet(data);


        // Add worksheet
        xlsx.utils.book_append_sheet(
            wb,
            ws,
            "Expense"
        );


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
            'attachment; filename="expense_details.xlsx"'
        );


        res.status(200).send(excelBuffer);

    } catch (error) {

        console.error(
            "Error downloading expense Excel:",
            error
        );

        res.status(500).json({
            message: "Server Error"
        });
    }
};
