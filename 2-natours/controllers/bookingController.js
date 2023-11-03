const stripe = require('stripe')(process.env.STRIPE_SK);
const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get a currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
          }
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/payment/success.html`,
    cancel_url: `${req.protocol}://${req.get('host')}/payment/cancel.html`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId
  });
  // Create session as a response
  res.status(200).json({
    status: 'success',
    session
  });
});
