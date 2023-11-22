const express = require("express");
const { getProducts, getCustomers, getTransactions,getGeography } = require("../Controllers/Client.js");

const router = express.Router()
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);
module.exports= router;