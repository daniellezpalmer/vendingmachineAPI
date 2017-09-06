const bodyParser = require('body-parser')
const express = require('express')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/VendingMachine')
mongoose.Promise = require('bluebird')
ObjectId = require('mongodb').ObjectId
const app = express()
const vendingMachine = require('./models/vendingMachine.js')

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('in the get');
  vendingMachine.find().then((results) =>{
    res.json({products: results })
  })
})

app.post('/api/vendor/items/', (req, res,) => {
  const vendingSnacks = new vendingMachine ({
   name : req.body.name,
   cost : req.body.cost,
   amount : req.body.amount
})
    vendingSnacks.save()
      .then(() => {
        res.json({status : 'success'})
      })
  });

app.listen(3000, function() {
  console.log('Listening on 3000!');
})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});

process.on('SIGINT', function() {
      console.log("\nshutting down");
      mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected on app termination');
        process.exit(0);
      });
    });
