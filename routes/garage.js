var express = require('express');
const { get } = require('mongoose');
var router = express.Router();
const garageCtrl = require('../controllers/garage');


/* GET users listing. */

router.get('/', garageCtrl.index);
router.get('/new', garageCtrl.new);
router.get('/cart', garageCtrl.cartIndex);
// router.post('/cart', garageCtrl.addCart);
router.post('/', garageCtrl.create);
router.get('/:id', garageCtrl.show);



module.exports = router;
