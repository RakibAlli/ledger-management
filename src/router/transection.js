const express = require('express');
const router = express.Router();
const { createTransection, getTransection } = require("../controller/transection")
const authMiddleware = require("../middleware/auth")


router.post("/create", authMiddleware, createTransection);

router.get("/all", authMiddleware, getTransection);

module.exports = router;
