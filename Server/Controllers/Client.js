const product=require("../models/Products.js")
const productStat=require("../models/ProductStat.js")
const users=require("../models/User.jsx")
const transactions=require("../models/Transactions.js")
const getCountryIso3 = require("country-iso-2-to-3");
const getProducts = async(req,res) =>
{
    try {
        const products = await product.find();
        // console.log(products)
        const getProductStat = await Promise.all(
            products.map(async (prod) => {
                const stat = await productStat.find({
                    productId: prod._id
                });
                return {
                    ...prod._doc,
                    stat,
                }
            })
            );
        res.status(200).json(getProductStat);
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}

const getCustomers = async(req,res) =>
{
    try {
        const customers = await users.find({role : "user"}).select("-password");
        res.status(200).json(customers);
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}

const getTransactions = async(req,res) =>
{
    try {
        const { page= 1, pageSize = 20,  sort = null ,search = ""} = req.query;
        // console.log(page, pageSize, sort, search);
        const getFormatted = () => {
            const parsedSort = JSON.parse(sort);
            const formatted = {
                [parsedSort.field]: (parsedSort.sort = "asc" ? 1 : -1),
            };
            return formatted;
        };
        const formatted = Boolean(sort) ? getFormatted() : {};
        const transaction = await transactions.find({
            $or: [
                { cost: { $regex: search, $options: "i" } },
                { userId: { $regex: search, $options: "i" } }
            ],
        })
            .sort(formatted)
            .skip(page * pageSize)
            .limit(pageSize);
        const count = await transactions.countDocuments();
        // console.log("count",count)
        res.status(200).json({
            count, transaction,
        });
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}

const getGeography = async (req, res) => {
    try {
        const user = await users.find();
        const locations = user.reduce((acc, curr) => {
            const countryISO3 = getCountryIso3(curr.country);
            if (!acc[countryISO3])
            {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});
        const formattedLocations = Object.entries(locations).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        );
        res.status(200).json(formattedLocations);
    }  
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
};

module.exports = { getProducts, getCustomers, getTransactions, getGeography }; 
