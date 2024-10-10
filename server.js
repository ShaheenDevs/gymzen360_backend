const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mainRoute = require('./routes/main');
const port = process.env.PORT || 3000;
const multer = require('multer');
const path = require('path');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the main routes file
app.use(mainRoute);

app.get('/', (req, res) => {
    res.send('GYM ON is Running');
});

app.post('/pk', (req, res) => {
    res.send(req.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
