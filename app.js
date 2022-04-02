const express = require('express');
const app = express();
const port = 8000;


const { sequelize } = require('./src/models/index');

const dotenv = require('dotenv').config();

sequelize.sync({alter: false}).then().catch(err=> console.log(err));

const routesV1 = require('./src/routes/routes.v1');

global.__basedir = __dirname;

app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Hello World!')
});

routesV1(app, '/api');


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});