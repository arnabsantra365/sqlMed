const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const con = require('./connection')
const syncData = require('./dropboxSync');
// const api = process.env.api

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "https://delightful-liger-3725d9.netlify.app/" , credentials:true }));
con.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
    con.query(`SELECT * FROM phonedata`,(err,result)=>{
        if(err) throw err;
        console.log(result);
    })
  });


  app.post(`/api/form`, (req, res) => {
    const {  name, countryCode, phoneNumber } = req.body;
    
    console.log(name,countryCode,phoneNumber);
    // Perform validation checks here
    
    // Insert into MySQL database
    const sql = `INSERT INTO phonedata ( name, code, phno) VALUES ( ?, ?, ?)`;
    con.query(sql, [ name, countryCode, phoneNumber], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).send('Error inserting data into database');
      } else {
        res.status(200).send('Form data inserted successfully');
      }
    });
  });

  app.get(`/api/sync`, async (req, res) => {
    try {
      await syncData();
      res.status(200).json({ message: 'Data synchronized with Dropbox successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to synchronize data with Dropbox.' });
    }
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });