const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv-safe').config({
  silent: true,
  allowEmptyValues: true,
  path: process.env.CI ? '../ci/.env' : '.env',
  example: process.env.CI ? '../ci/.env.ci.example' : '.env.example',
});

const frontPath = path.resolve(__dirname, 'views/');
const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(express.static(frontPath));
app.use(express.json());
app.use(compression());
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(frontPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
