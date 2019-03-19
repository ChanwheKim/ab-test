const express = require('express');
const index = require('./routes/index');
const { NotFoundError } = require('./lib/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', index);

app.use(express.static('dist'));

app.use((err, req, res, next) => {
  res.status(err.state || 500);
  res.json(new NotFoundError());
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
