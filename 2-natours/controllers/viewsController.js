const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user'
  });

  if (!tour) return next(new AppError('There is no tour with that name', 404));

  res.status(200).render('tour', {
    title: tour.name,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login Form'
  });
};
