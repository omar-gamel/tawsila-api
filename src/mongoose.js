const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const autoIncrement = require('mongoose-auto-increment');
const config = require('config');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('mongoUrl'));

autoIncrement.initialize(mongoose.connection);
mongoose.plugin(mongoose_delete, { overrideMethods: true });
mongoose.connection.on('connected', () =>
  console.log('\x1b[32m%s\x1b[0m', '[DB] Connected...')
);
mongoose.connection.on('error', (err) =>
  console.log('\x1b[31m%s\x1b[0m', '[DB] Error : ' + err)
);
mongoose.connection.on('disconnected', () =>
  console.log('\x1b[31m%s\x1b[0m', '[DB] Disconnected...')
);

module.exports = mongoose;
