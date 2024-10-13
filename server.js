const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mainRoute = require('./routes/main');
const port = process.env.PORT || 3000;
const path = require('path');
const cron = require('node-cron');
const sequelize = require('./models').sequelize;
const { addMonthlyFee } = require('./controllers/fee');


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

app.post('/', (req, res) => {
    res.send(req.body);
});

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized');
}).catch(error => {
    console.error('Error synchronizing the database:', error);
});

// Schedule the cron job to run on the first day of each month at midnight
cron.schedule('0 0 1 * *', addMonthlyFee);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
