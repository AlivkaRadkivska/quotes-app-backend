const express = require('express');
const quotesRouter = require('./routers/quotesRouter');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send({
    availableRoutes: ['GET /quotes', 'POST /quotes/add', 'DELETE /quotes/:id'],
  });
});

app.use('/quotes', quotesRouter);
app.all('*', (_req, _res, next) => {
  next(new Error('Not found', 404));
});

dotenv.config({ path: './.env' });
let url = process.env.MONGO_URL;
const port = process.env.PORT;

mongoose
  .connect(url)
  .then(() => console.log('DB is connected'))
  .then(() =>
    app.listen(port, () => {
      console.log(`App is running on http://localhost:${port}`);
    })
  );

process.on('unhandledRejection', (err) => {
  console.log('Rejection!', err.name, err.message);
  console.log('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
