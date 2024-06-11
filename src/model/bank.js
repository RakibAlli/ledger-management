const mongoose = require("mongoose");

const banksSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, required: true },
        accountNumber: { type: String, required: true, unique: true },
        ifscCode: { type: String, required: true },
        photo: { type: String, required: false },
        amount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bank", banksSchema);
