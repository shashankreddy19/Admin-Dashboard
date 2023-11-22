const stats=require("../models/OverviewStat.js")
const getStats = async (req, res) => {
    try {
        const OverviewStats = await stats.find();
        res.status(200).json(OverviewStats[0]);
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
};

module.exports = { getStats };
