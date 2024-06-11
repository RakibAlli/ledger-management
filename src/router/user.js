const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require("../controller/user")

const upload = require("../middleware/multer")

const photo = upload.single("photo")

router.post("/create", photo, createUser);

router.post("/login", loginUser);



module.exports = router;
