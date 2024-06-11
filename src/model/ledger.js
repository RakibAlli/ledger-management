const mongoose = require("mongoose");

const ledgersSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, required: true },
        photo: { type: String, required: false },
        type: { type: String, enum: ["income", "expense", "investment"], required: true },
        amount: { type: Number, required: false, default: 0 },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Ledger", ledgersSchema);
