var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/api/v1/mail/:id', function (req, res, next) {
  const file = `${__dirname}/assets/${req.params.id}.eml`;
  res.download(file); // Set disposition and send it.
});

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000');
})
