const express = require('express');
const jwtAuth = require('../../services/passport');
const settingsController = require('../../controllers/settings/settings.controller');
const router = express.Router();

router
  .route('/')
  .post(jwtAuth.authenticate(), settingsController.create)
  .get(jwtAuth.authenticate(), settingsController.findAll);

router
  .route('/:id')
  .get(jwtAuth.authenticate(), settingsController.findOne)
  .delete(jwtAuth.authenticate(), settingsController.delete)
  .patch(jwtAuth.authenticate(), settingsController.Update);

module.exports = router;
