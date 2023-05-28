const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/routes');

require('dotenv').config();
const MONGO_CREDENTIALS = process.env.MONGO_CREDENTIALS;


const app = express();

app.use(bodyparser.json());
app.use(cors());

app.use(routes);

mongoose.connect(`mongodb+srv://${MONGO_CREDENTIALS}@product-app-udemy.znr3hub.mongodb.net/messages?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running, access on http://localhost:3000');
        })
    })
    .catch(err => console.log(err));
