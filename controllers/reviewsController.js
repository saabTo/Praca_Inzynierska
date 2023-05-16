const Review = require('../models/reviewsModel');

exports.create = (req, res) => {
  const review = new Review({
    rating: req.body.rating,
    text: req.body.text
  });
  review.save((error, review) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(review);
    }
  });
};