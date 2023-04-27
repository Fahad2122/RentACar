const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express()
const port = 5000

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//Availble routes
app.use('/api/user', require('./routes/user'));
app.use('/api/emp', require('./routes/employee'));
app.use('/api/car', require('./routes/car'));
app.use('/api/order', require('./routes/order'));
app.use('/api/office', require('./routes/office'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})