var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/api/v1/mail/:id', (req, res) => {
  const file = `${__dirname}/assets/${req.params.id}.eml`;
  res.download(file);
});

app.listen(3000, () => {
  console.log('CORS-enabled web server listening on port 3000');
});
