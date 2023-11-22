const express = require("express");
const { getStats } = require("../Controllers/Sales");
const router = express.Router()

router.get("/overview", getStats);

module.exports= router;