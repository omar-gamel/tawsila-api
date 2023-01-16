const config = require('config');
const app = require('./src/app');

const PORT = process.env.PORT || config.get('port');

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
