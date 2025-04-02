const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');
require('./db/dbConfig.js');

const PORT = process.env.PORT || 8000;

const app = express();

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', router);

app.listen(PORT, () => {
    console.log(`server running on the PORT http://localhost:${PORT}/`)
})
