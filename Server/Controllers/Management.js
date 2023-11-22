const users = require("../models/User.jsx")
const mongoose = require("mongoose");
const transactions = require("../models/Transactions.js");

const getAdmins = async (req, res) =>
{
    try {
        const user = await users.find({ role: "admin" }).select("-password");
        res.status(200).json(user);
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}

const getPerformance = async (req, res) =>
{
    try {
        const { id } = req.params;
        const userWithStats = await users.aggregate([
            {
                $match: {_id : new mongoose.Types.ObjectId(id)}
            },
            {
                $lookup: {
                    from: "affiliates",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats" },
        ]);
        // console.log("user",userWithStats);
        const salesTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return transactions.findById(id);
            })
        );
        const filteredSalesTransactions = salesTransactions.filter((transaction) =>
            transaction !== null
        );
        res.status(200).json({user : userWithStats[0],sales : filteredSalesTransactions});
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}
module.exports = { getAdmins,getPerformance };