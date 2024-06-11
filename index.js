const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoDB = require("./config/db");
const router = require("./src/router/router");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use('/api', router);


app.use("/", (req, res) => {
    res.status(200).json({ meta: { status: true, message: "Welcome to ledger management" } })
})
app.use("*", (req, res) => {
    res.status(404).json({ meta: { status: false, message: "Not Found" } })
})
MongoDB
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});