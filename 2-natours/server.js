const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(con => {
    console.log(con.connections);
    console.log('DB is connected');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on the port ${port}...`);
});
