const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const authRoute = require('./routes/auth')

app.use(bodyParser.json());
app.use("/auth", authRoute);

// app.get('/', (req, res) => {
//     res.send("Pakistan...");
// });

module.exports = app