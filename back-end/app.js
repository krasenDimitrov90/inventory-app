const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.json({hello: 'World'});
})

app.listen(3000, () => {
    console.log('Server is running, access on http://localhost:3000');
})