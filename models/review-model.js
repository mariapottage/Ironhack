const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Please tell us about your review'],
    minlength: [10, 'Please write at least10 characters'],
    maxlength: [400, 'please write less. Limit 400 characters per review']
  },
  stars: {
    type: Number,
    required: [true, 'Please Rate product'],
    min: [1, "Ratings can be no lower than 1 star"],
    max: [5, "Ratings can no be better than 5 stars"]
    },
  author: {type: String, required: [true, 'Please provide your name']},
});

const Review =mongoose.model('Review', reviewSchema);


module.exports = Review;

//.....................
// IF WE WERE SAVING BY REFERENCE INSTEAD OF SUBDOCUMENTS
//
// theReview = new Review({
//   content: req.body.content,
//   starts: req.body.stars,
//   author: req.body.author,
//   product: req.params.productId
// });
