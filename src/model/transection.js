const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        description: { type: String, required: false },
        amount: { type: Number, required: true },
        type: { type: String, enum: ["debit", "credit"], required: true },
        bankId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bank",
            required: true,
        },
        ledgerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ledger",
            required: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        modifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Transaction", transactionsSchema);
