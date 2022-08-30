const Cart = require('../models/garage');
const Item = require('../models/garage');

function index(req,res){
    // res.render("garage/index");
    Item.find({}, function (err, items){
        if(err) return res.redirect('/');
        res.render('garage/index', { items });
    })
}

function show(req, res){
    Item.findById(req.params.id, function(error, items){
        items.save(function(error){
          res.render('garage/show', {items});
        });
    });
}

function cartIndex(req, res){
    res.render("garage/cart");
}

function createCart(req, res){
    const cart = new Cart();
}

function addCart(req, res){
    // Item.findById(req.params.id, function(err, items){
    //     if(err) return res.redirect('/');
    //     Cart.items.push(items);
    //     res.render('garage/cart', { items });
    // })
}

function newGarage(req, res){
    res.render("garage/new");
}


function create(req, res) {
    const item = new Item(req.body);
    item.save(function(err) {
      if (err) return res.render('garage/new');
      console.log(item);
      res.redirect('/garage');
    });
  }


module.exports = {
    index,
    new: newGarage,
    create,
    cartIndex,
    createCart,
    addCart,
    show,
};