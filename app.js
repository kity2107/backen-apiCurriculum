require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const app = express();

app.use(cors());
//capturo el json q envia el body
app.use(express.json());
app.use(express.static('storage'));

const port = process.env.PORT || 3000;

//rutas
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

dbConnect();
