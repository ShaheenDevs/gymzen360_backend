const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mainRoute = require('./routes/main');
const app = express();
const port = process.env.PORT || 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sequelize Initialization
const sequelize = new Sequelize(
  'gymzenco_gymzenco_gym',          // Database name
  'gymzenco_gymzenco_gymzenco_gym',  // Username
  '&geq=#sA_414',                    // Password
  {
    host: 'gymzen360.com',           // Database host
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000          // Connection timeout 60 seconds
    }
  }
);

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
app.use(mainRoute);

app.get('/', (req, res) => {
  res.send('GYM ON is Running');
});

app.post('/pk', (req, res) => {
  res.send(req.body);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});