const express = require('express');
const router = express.Router({ mergeParams: true });
const quotesController = require('./../controllers/quotesController');

router.get('/', quotesController.getQuotes);
router.post('/add', quotesController.addQuote);
router.delete('/:id', quotesController.deleteQuote);

module.exports = router;
