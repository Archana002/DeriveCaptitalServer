const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const PORT = process.env.PORT || 8000;

//const nodemailer = require("nodemailer");


const db = knex({
    client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'Arch@1',
    database: 'dc'
  }
});
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/booking', (req,res) =>{
    db.select().from('booking').then(data => {
        res.send(data)
    })
})

app.post('/booking', (req, res) => {
    const{
        fname,
        lname,
        email,
        phone,
        city,
        country
    } = req.body;

   var data = {
    "fname"  : fname,
    "lname"  : lname,
    "email"  : email,
    "phone"  : phone,
    "city" : city,
    "country"  : country

    };
    db.insert({
        fname  : fname,
        lname  : lname,
        email  : email,
        phone  : phone,
        city  : city,
        country  : country
    }).into('booking').asCallback(function (err) {

        if(err) {
            res.status(400).json(err)
            console.log(err);
        }
        else{
            res.status(200).json(data);
        }
    })

    });



app.get('/', (req, res) => {
    res.send('Server is running')
});

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})