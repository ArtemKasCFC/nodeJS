const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log('!uncaughtException!');
  console.log(err.name, '-', err.message);
  process.exit(1);
});

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(con => {
    console.log('DB is connected');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`The server is running on the port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('!unhandledRejection!');
  console.log(err.name, '-', err.message);
  server.close(() => process.exit(1));
});
