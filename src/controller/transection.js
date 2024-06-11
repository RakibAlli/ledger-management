const Bank = require("../model/bank");
const Ledger = require("../model/ledger");
const Transaction = require("../model/transection");
const moment = require("moment");
const createTransection = async (req, res) => {
    try {
        const { date, description, amount, type, bankId, ledgerId } = req.body;

        // Validate input
        if (!date || !amount || !type || !bankId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate date format
        const formattedDate = moment(date, 'DD-MM-YYYY', true);
        if (!formattedDate.isValid()) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Check if the bank exists and retrieve its current amount
        const bank = await Bank.findById(bankId);
        if (!bank) {
            return res.status(404).json({ error: 'Bank not found' });
        }

        // Update bank amount based on transaction type
        if (type === 'credit') {
            bank.amount += amount;

            // Update ledger for investment and income types
            let ledger = await Ledger.findOne({ userId: req.user._id, _id: ledgerId });
            if (!ledger) {
                // Create a new ledger entry if not found
                ledger = await Ledger.create({
                    userId: req.user._id,
                    name: 'Other Expenses',
                    type: 'expense',
                    amount: amount
                });
            } else {
                // Update existing ledger for investment and income types
                if (ledger.type === 'expense') {
                    ledger.amount += amount;
                    await ledger.save();
                } else if (ledger.type === 'investment' || ledger.type === 'income') {
                    ledger.amount += amount;
                    await ledger.save();
                }
            }
        } else if (type === 'debit') {
            if (bank.amount < amount) {
                return res.status(400).json({ error: 'Insufficient funds' });
            }
            bank.amount -= amount;

            // Update ledger for expense type
            let ledger = await Ledger.findOne({ userId: req.user._id, _id: ledgerId });
            if (!ledger) {
                // Create a new ledger entry if not found
                ledger = await Ledger.create({
                    userId: req.user._id,
                    name: 'Other Expenses',
                    type: 'expense',
                    amount: amount
                });
            } else {
                // Update existing ledger for expense type
                if (ledger.type === 'expense') {
                    ledger.amount += amount;
                    await ledger.save();
                }
            }
        } else {
            return res.status(400).json({ error: 'Invalid transaction type' });
        }

        // Save the updated bank information
        await bank.save();

        // Create the transaction entry
        const transaction = await Transaction.create({
            ...req.body,
            date: formattedDate.toDate(),
            createdBy: req.user._id,
            modifiedBy: req.user._id
        });

        res.status(201).json({ meta: { status: true, message: "Transaction created successfully" }, data: transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTransection = async (req, res) => {
    try {
        const transection = await Transaction.find({ createdBy: req.user._id });
        res.status(200).json({
            meta: { status: true, message: "Transection fetched successfully" },
            data: transection
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            meta: { status: false, message: "Internal server error" }
        })
    }
};
module.exports = { createTransection, getTransection }