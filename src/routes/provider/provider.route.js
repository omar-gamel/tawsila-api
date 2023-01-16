const express = require('express');
const jwtAuth = require('../../services/passport');
const providerController = require('../../controllers/provider/provider.controller');
const router = express.Router();

router
  .route('/')
  .post(jwtAuth.authenticate(), providerController.create)
  .get(jwtAuth.authenticate(), providerController.findAll);

router
  .route('/:id')
  .get(jwtAuth.authenticate(), providerController.findOne)
  .delete(jwtAuth.authenticate(), providerController.delete)
  .patch(jwtAuth.authenticate(), providerController.Update);

module.exports = router;
