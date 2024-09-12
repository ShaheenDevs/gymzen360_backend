const express = require('express');

const app = express();

const authRoute = require('./routes/auth')

app.use("/auth", authRoute);

// app.get('/', (req, res) => {
//     res.send("Pakistan...");
// });

module.exports = app