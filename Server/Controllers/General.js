const transactions = require("../models/Transactions.js");
const stats = require("../models/OverviewStat.js");
const users = require("../models/User.jsx");

const getUser = async(req,res) =>
{
  try {

    const { id } = req.params;
    const user = await users.findById(id);
    res.status(200).json(user);
  }
  catch (err)
  {
    res.status(404).json({message : err.message})
  }
}

const getDashboard = async(req, res)=>
{
  try {
    const currentMonth = "November";
    const currentDay = "2021-11-15";
    const currentYear = 2021;

    const transaction = await transactions.find().limit(50).sort({ createdOn: -1 });
    const stats = await stats.find({ year: currentYear });
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      dailyData
    } = overallStats[0];

    const thisMonthStats = monthlyData.find((month) => month === currentMonth);
    const thisDayStats = dailyData.find((day) => day === currentDay);

    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      thisDayStats,
      transaction,
    });
  }

  catch (err)
  {
    res.status(404).json({ message: err.message });
  }
}

module.exports = { getUser,getDashboard };