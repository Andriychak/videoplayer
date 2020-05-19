const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3000;

const favicon = require('serve-favicon');

const app = express();

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log('Server is running on localhost:' + port);
});
