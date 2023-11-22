const express = require("express");
const { getAdmins } = require("../Controllers/Management");
const { getPerformance } = require("../Controllers/Management");
const router = express.Router()

router.get("/admin", getAdmins);
router.get("/performance/:id", getPerformance);

module.exports= router;