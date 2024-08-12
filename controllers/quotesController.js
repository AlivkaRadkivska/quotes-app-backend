const Quote = require('./../models/quoteModel');
const catchAsync = require('./../utils/catchAsync');

exports.getQuotes = catchAsync(async (req, res, next) => {
  const items = await Quote.find({});

  res.status(201).json({
    status: 'success',
    data: {
      items,
    },
  });
});

exports.addQuote = catchAsync(async (req, res, next) => {
  const { text, author } = req.body;
  if (!text | !author)
    res.status(301).json({
      status: 'failure',
      message: 'Text or author not found',
    });

  const item = await Quote.create({ text, author });
  res.status(201).json({
    status: 'success',
    data: {
      item,
    },
  });
});

exports.deleteQuote = catchAsync(async (req, res, next) => {
  const item = await Quote.findByIdAndDelete(req.params.id);

  if (!item) res.status(404).json({ status: 'Not found' });

  res.status(201).json({
    status: 'success',
  });
});
