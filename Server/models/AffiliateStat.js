const mongoose = require("mongoose");

const AffiliateStatSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref: "Transaction",
    },
},
    { timestamps: true }
);

const affiliate = mongoose.model("affiliate", AffiliateStatSchema);
module.exports = affiliate;