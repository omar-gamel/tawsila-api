const deepstream = require('deepstream.io-client-js');

const dsClient = deepstream('127.0.0.1:6020');

dsClient.login();

dsClient.on('connectionStateChanged', (connection) => {
  console.log('deepstream connected');
});

dsClient.on('error', (err) => {
  console.log('Deepstream Error: ');
});

module.exports = dsClient;
