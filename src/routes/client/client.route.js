const express = require('express');
const jwtAuth = require('../../services/passport');
const upload = require('../../services/multer-service');
const clientController = require('../../controllers/client/client.controller');
const favoriteController = require('../../controllers/favorite/favorite.controller');
const router = express.Router();

router
  .route('/')
  .post(jwtAuth.authenticate(), upload.single('image'), clientController.create)
  .get(jwtAuth.authenticate(), clientController.findAll);

router
  .route('/:id')
  .get(jwtAuth.authenticate(), clientController.findOne)
  .delete(jwtAuth.authenticate(), clientController.delete)
  .patch(
    jwtAuth.authenticate(),
    upload.single('image'),
    clientController.Update
  );

router
  .route('/:clientId/addTofavorite')
  .post(jwtAuth.authenticate(), favoriteController.addToFavourite);

router
  .route('/:clientId/removefavorite')
  .post(jwtAuth.authenticate(), favoriteController.removeFromFavourite);
router
  .route('/:clientId/get-all-favorites')
  .get(jwtAuth.authenticate(), favoriteController.findAllClientFavourite);

module.exports = router;
