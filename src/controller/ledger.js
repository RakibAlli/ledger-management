const Ledger = require("../model/ledger");

const createLedger = async (req, res) => {
    try {
        const { name, type } = req.body;
        if (!name || !type) {
            return res.status(400).json({
                meta: { status: false, message: "All fields are required" }
            });
        }
        const ledgerExist = await Ledger.findOne({ name });
        if (ledgerExist) {
            return res.status(400).json({
                meta: { status: false, message: "Ledger already exists" }
            });
        }
        let photo = "/uploads/" + req.file.filename;

        const newLedger = new Ledger({
            ...req.body,
            photo: photo,
            userId: req.user._id
        });
        let result = await newLedger.save();
        res.status(200).json({
            meta: { status: true, message: "Ledger created successfully" },
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            meta: { status: false, message: "Internal server error" }
        })
    }
};

const getLedger = async (req, res) => {
    try {
        const ledger = await Ledger.find({ userId: req.user._id });
        res.status(200).json({
            meta: { status: true, message: "Ledger fetched successfully" },
            data: ledger
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            meta: { status: false, message: "Internal server error" }
        })
    }
};
const getAllLedger = async (req, res) => {
    try {
        const ledger = await Ledger.find();
        res.status(200).json({
            meta: { status: true, message: "Ledger fetched successfully" },
            data: ledger
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            meta: { status: false, message: "Internal server error" }
        })
    }
};
module.exports = { createLedger, getAllLedger, getLedger }