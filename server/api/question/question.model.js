'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  // maybe refactor asker into an object
  askerId: {type: Schema.Types.ObjectId, ref: 'User'},
  askerName: String,
  askerPic: String,
  query: String,
  swipeLeft: {
  	option: String,
  	votes: Number,
  	image: String,
    voters: Array
  },
  swipeRight: {
  	option: String,
  	votes: Number,
  	image: String,
    voters: Array
  },
  isActive: { type: Boolean, default: true },
  timeCreated: { type: Date, default: new Date , index: {unique: true } },
  closesAt: { type: Date, index: { unique: true } }
});

module.exports = mongoose.model('Question', QuestionSchema);