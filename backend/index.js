const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const con = require('./connection')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
con.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
    con.query(`SELECT * FROM phonedata`,(err,result)=>{
        if(err) throw err;
        console.log(result);
    })
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });