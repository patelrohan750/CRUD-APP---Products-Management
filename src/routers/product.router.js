const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.contoller');
const middleware=require('../middleware/requireLogin.middleware')


router.get('/',middleware.requireLogin, controller.Homeroute);
router.get('/add-product',middleware.requireLogin, controller.add_product);
router.get('/update-product/:id',middleware.requireLogin, controller.update_product);
router.get('/login',controller.login);
router.post('/login',controller.loginData);
router.get('/logout',controller.logout);


//api
router.post('/api/product',middleware.requireLogin, controller.create);
router.get('/api/product',middleware.requireLogin, controller.read);
router.post('/api/product/update/',middleware.requireLogin, controller.update);
router.get('/api/product/delete/:id',middleware.requireLogin, controller.delete);

module.exports = router;
