const express = require('express');
const userRoute = require('./user/user.route');
const clientRoute = require('./client/client.route');
const providerRoute = require('./provider/provider.route');
const settingRoute = require('./settings/settings.route');
const router = express.Router();

router.use('/user', userRoute);

router.use('/clients', clientRoute);

router.use('/providers', providerRoute);

router.use('/settings', settingRoute);

module.exports = router;
