'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  query: String,
  swipeLeft: {
  	option: String,
  	votes: Number,
  	image: String
  },
  swipeRight: {
  	option: String,
  	votes: Number,
  	image: String
  }
});

module.exports = mongoose.model('Question', QuestionSchema);