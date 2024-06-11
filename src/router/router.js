const express = require('express');
const router = express.Router();
const userRouter = require("./user")
const bankRouter = require("./bank")
const ledgerRouter = require("./ledger")
const transectionRouter = require("./transection")

router.use("/user", userRouter)
router.use("/bank", bankRouter)
router.use("/ledger", ledgerRouter)
router.use("/transection", transectionRouter)


module.exports = router;
