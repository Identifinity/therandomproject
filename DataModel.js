const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  nr: Number,
  date: String
});

const Model = mongoose.model('data', Schema);

module.exports = Model;
