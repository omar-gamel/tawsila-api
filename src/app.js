const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const i18n = require('i18n');
const mongoose = require('./mongoose');
const jwtAuth = require('./services/passport');
const swaggerSpec = require('./middlewares/swagger');
const ApiError = require('./helpers/ApiError');
const router = require('./routes');

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(helmet());
app.use(jwtAuth.initialize());

i18n.configure({
  locales: ['en', 'ar'],
  directory: __dirname + '/locales',
});

app.use(i18n.init);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  let contype = req.headers['content-type'];
  if (
    contype &&
    !(
      contype.includes('application/json') ||
      contype.includes('multipart/form-data')
    )
  )
    return res
      .status(415)
      .send({ error: 'Unsupported Media Type (' + contype + ')' });
  next();
});

app.use(bodyParser.json({ limit: '100mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use((req, res, next) => {
  next(new ApiError(404, 'Not Found.'));
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res
    .status(error.status || 500)
    .json({ message: error.message, data: error.data });
});

module.exports = server;
