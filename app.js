const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mainRoute = require('./routes/main')

app.use(bodyParser.json());
app.use(mainRoute);

// app.get('/', (req, res) => {
//     res.send("Pakistan...");
// });

module.exports = app