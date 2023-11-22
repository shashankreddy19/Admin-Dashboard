const mongoose = require("mongoose")

const TransactionSchema = mongoose.Schema({
    userId: String,
    cost: String,
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number,
    },
},
    { timestamps: true }
);

const transactions = mongoose.model("transactions", TransactionSchema);
module.exports = transactions;