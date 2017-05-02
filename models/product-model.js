const mongoose = require('mongoose');

const Review = require('./review-model.js');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required:[true, 'Please enter your name']},
  price: {type: Number, default: 0},
  imageUrl: {type: String, default: '/images/box.gif' },
  description: {type: String},
    // REVIEW AS AN ARRAY OF SUBDOCUMENTS OF Product
  reviews: [Review.schema],
  category: {
    enum: ['Games', '']
  }
});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
