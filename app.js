require('dotenv').config();
const express = require('express');
const cors = require('cors');

const morganBody = require('morgan-body');
const loggerStream = require('./utils/handleLogger');

const dbConnectNoSql = require('./config/mongo');
const { dbConnectMySql } = require('./config/mysql');
const app = express();

const DB_ENGINE = process.env.DB_ENGINE;

app.use(cors());
//capturo el json q envia el body
app.use(express.json());
app.use(express.static('storage'));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

const port = process.env.PORT || 3000;

//rutas
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

DB_ENGINE === 'nosql' ? dbConnectNoSql() : dbConnectMySql();
