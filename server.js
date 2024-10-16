require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cron = require('node-cron');
const mainRoute = require('./routes/main');
const Sequelize = require('sequelize');
const { addMonthlyFee } = require('./controllers/fee');

// Load Sequelize config based on the environment
const environment = process.env.NODE_ENV || 'development';

const password = process.env.DB_PASSWORD === 'null' ? null : process.env.DB_PASSWORD;
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, password, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
});

const app = express();
const port = process.env.PORT || 3000;

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

// Synchronize the database
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized');
}).catch(error => {
    console.error('Error synchronizing the database:', error);
});

// Schedule the cron job to run on the first day of each month at midnight
cron.schedule('0 0 1 * *', addMonthlyFee);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${environment} mode`);
});
