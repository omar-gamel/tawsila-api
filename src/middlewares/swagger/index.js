const swaggerJson = require('./swagger');
const userDocs = require('../../docs/user/user.docs');
const clientDocs = require('../../docs/client/client.docs');
const providerDocs = require('../../docs/provider/provider.docs');
const settingDocs = require('../../docs/settings/settings.docs');

swaggerJson.paths = Object.assign(
  {},
  swaggerJson,
  userDocs.paths,
  clientDocs.paths,
  providerDocs.paths,
  settingDocs.paths
);

swaggerJson.components.schemas = Object.assign(
  {},
  userDocs.components.schemas,
  clientDocs.components.schemas,
  providerDocs.components.schemas,
  settingDocs.components.schemas
);

module.exports = swaggerJson;
