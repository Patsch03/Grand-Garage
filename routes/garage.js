var express = require('express');
const { get } = require('mongoose');
var router = express.Router();
const garageCtrl = require('../controllers/garage');


/* GET users listing. */

router.get('/', garageCtrl.index);
router.post('/', garageCtrl.create);

router.post('/edit/:id', garageCtrl.edit);
router.get('/edit/:id', garageCtrl.editGet);

router.get('/new', garageCtrl.new);

router.get('/cart', garageCtrl.cartIndex);
router.post('/cart', garageCtrl.removeO);
router.delete('/cart', garageCtrl.purchase);

router.post('/:id', garageCtrl.addCart);
router.get('/:id', garageCtrl.show);

router.get('/:id/remove', garageCtrl.remove);
router.delete('/:id/remove', garageCtrl.delete);





module.exports = router;
