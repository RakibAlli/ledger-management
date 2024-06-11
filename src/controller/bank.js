const Bank = require("../model/bank");


const createBankAccount = async (req, res) => {
    try {
        const { name, accountNumber, ifscCode } = req.body;
        if (!name || !accountNumber || !ifscCode) {
            return res.status(400).json({
                meta: { status: false, message: "All fields are required" }
            });
        }
        const bankExist = await Bank.findOne({ accountNumber });
        if (bankExist) {
            return res.status(400).json({
                meta: { status: false, message: "Bank account already exists" }
            });
        }
        let photo = "/uploads/" + req.file.filename;
        const newBank = new Bank({
            ...req.body,
            userId: req.user._id,
            photo: photo
        });
        let result = await newBank.save();
        res.status(200).json({
            meta: { status: true, message: "Bank account created successfully" },
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            meta: { status: false, message: "Internal server error" }
        })
    }
};
const getBank = async (req, res) => {
    try {
        const bank = await Bank.find({ userId: req.user._id });
        const totalAmount = bank.reduce((acc, bank) => acc + bank.amount, 0);
        res.status(200).json({
            meta: { status: true, message: "Bank account fetched successfully" },
            data: bank, totalAmount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            meta: { status: false, message: "Internal server error" }
        })
    }
};
module.exports = { createBankAccount, getBank }