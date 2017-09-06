const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var vendingMachineSchema = new Schema({
    name: {type: String},
    cost: {type: Number},
    amount: {type: Number}
});

const VendingMachine = mongoose.model('VendingMachine', vendingMachineSchema);

module.exports = VendingMachine;
