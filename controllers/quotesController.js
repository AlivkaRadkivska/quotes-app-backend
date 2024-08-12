const Quote = require('./../models/quoteModel');
const catchAsync = require('./../utils/catchAsync');

exports.getQuotes = catchAsync(async (req, res, next) => {
  const data = await Quote.find({});

  res.status(201).json({
    success: true,
    data,
  });
});

exports.addQuote = catchAsync(async (req, res, next) => {
  const { text, author } = req.body;
  if (!text | !author)
    res.status(301).json({
      success: false,
      message: 'Text or author not found',
    });

  const data = await Quote.create({ text, author });
  res.status(201).json({
    success: true,
    data,
  });
});

exports.deleteQuote = catchAsync(async (req, res, next) => {
  const data = await Quote.findByIdAndDelete(req.params.id);

  if (!data)
    res.status(404).json({
      success: false,
      message: 'Not found',
    });

  res.status(201).json({
    success: true,
  });
});
