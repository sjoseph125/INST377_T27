// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');

    res.send('Assignment 2 Group 67');
  })
  .post(async(req, res) => {
    const data = await fetch('http://www.opensecrets.org/api/?method=getLegislators&id=NJ&output=json&apikey=0e31f29705fa26f604e00f070aea5e11');
    const json = await data.json();
    res.json(json);
    console.log(json)
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
