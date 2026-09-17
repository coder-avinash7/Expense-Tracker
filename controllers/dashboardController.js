const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId,Types } = require("mongoose"); // Correctly destructuring Types from Mongoose

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        // Convert the string userId into a Mongoose ObjectId for aggregation
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

        // Fetch total expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // Calculate time boundary for 60 days (in milliseconds)
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        // Calculate time boundary for 30 days (in milliseconds)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);


        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            createdAt: { $gte: sixtyDaysAgo }
        }).sort({ date: -1 });

        // Get total income for last 60 days using reduce
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: thirtyDaysAgo },
        }).sort({ date: -1 });

        // Get total expenses for last 30 days using reduce
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // // Fetch last 5 transactions (income + expenses)
        // const lastTransactions = [
        //     // Fetch latest 5 income transactions
        //     ...(await Income.find({ userId })
        //         .sort({ date: -1 })
        //         .limit(5)
        //         .map((txn) => ({
        //             ...txn.toObject(),
        //             type: "income",
        //         }))),

        //     // Fetch latest 5 expense transactions
        //     ...(await Expense.find({ userId })
        //         .sort({ date: -1 })
        //         .limit(5)
        //         .map((txn) => ({
        //             ...txn.toObject(),
        //             type: "expense",
        //         }))),
        // ].sort((a, b) => b.date - a.date); // Sort combined array by date (latest first)

        // Fetch latest 5 income transactions
            const lastIncomeTransactions = await Income.find({ userId })
                .sort({ date: -1 })
                .limit(5);

            const incomeTxns = lastIncomeTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "income",
            }));

        // Fetch latest 5 expense transactions
            const lastExpenseTransactions = await Expense.find({ userId })
                .sort({ date: -1 })
                .limit(5);

            const expenseTxns = lastExpenseTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            }));

        // Merge & sort by date
            const lastTransactions = [...incomeTxns, ...expenseTxns].sort(
                (a, b) => b.date - a.date
            );


        // Final Response
        res.json({
            // Calculate total balance: Income - Expense, defaulting to 0 if aggregate returns empty array
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        console.error("Dashboard Data Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
