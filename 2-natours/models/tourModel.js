const mongoose = require('mongoose');
const slugify = require('slugify');
// For embedding
// const User = require('./userModel');

// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must have less or equal then 40 characters'],
      minlength: [10, 'A tour must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'Name must contain only characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      trim: true,
      enum: { values: ['easy', 'medium', 'difficult'], message: 'Difficulty can be easy, medium or difficult' },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, 'Rating must be below 5.0'],
      min: [1, 'Rating must be above 1.0'],
      set: val => val.toFixed(1),
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val <= this.price;
        },
        message: 'Discount ({VALUE}) must be less or equal then price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      //GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    // For embedding
    //guides: Array,
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// DOCUMENT Middleware: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// For embedding
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY Middleware
tourSchema.pre(/^find/, function (next) {
  // tourSchema.pre('find', function (next) {
  // tourSchema.pre('findOne', function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({ path: 'guides', select: ['-__v', '-passwordChangedAt'] });
  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(docs);
//   next();
// });

// AGGREGATION Middleware
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   // this._pipeline[0]['$match'] = { secretTour: { $ne: true } };
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
