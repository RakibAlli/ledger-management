const express = require('express');
const router = express.Router();
const { createBankAccount, getBank } = require("../controller/bank")

const upload = require("../middleware/multer")
const authMiddleware = require("../middleware/auth")
const photo = upload.single("photo")

router.post("/create", authMiddleware, photo, createBankAccount);

router.get("/all", authMiddleware, getBank);


module.exports = router;
