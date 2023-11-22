const express = require("express");
const { getUser, getDashboard } = require("../Controllers/General.js");

const router = express.Router()
router.get("/user/:id",getUser)
router.get("/dashboard", getDashboard);

module.exports= router;