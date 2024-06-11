const express = require('express');
const router = express.Router();
const { createLedger, getAllLedger } = require("../controller/ledger")

const upload = require("../middleware/multer")
const authMiddleware = require("../middleware/auth")
const photo = upload.single("photo")

router.post("/create", authMiddleware, photo, createLedger);

router.get("/all", authMiddleware, getAllLedger);

module.exports = router;
