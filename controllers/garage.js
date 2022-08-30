const Cart = require('../models/garage');
const Ditem = require('../models/ditems');
const Item = require('../models/garage');
const { findById } = require('../models/garage');

function index(req,res){
    Ditem.find({}, function (err, ditems){
        if(err) return res.redirect('/');
        res.render('garage/index', { ditems });
    })
}

function show(req, res){
    Ditem.findById(req.params.id, function(error, ditems){
        ditems.save(function(error){
          res.render('garage/show', {ditems});
        });
    });
}

function cartIndex(req, res){
    Ditem.find({purchased : true}, function(err,ditems){
        if(err) return res.redirect('/')
        res.render("garage/cart", {ditems});
    })
}

function addCart(req, res){
    Ditem.findById(req.params.id).exec(function(err, items){
        // console.log(items.purchased)
        if(err) return res.redirect('/');
        items.purchased = true;
        // console.log(items.purchased)
        items.save();
        res.redirect("/garage/cart");
    })
}

function newGarage(req, res){
    res.render("garage/new");
}


function create(req, res) {
    const ditem = new Ditem(req.body);
    // const item = new Item(req.body);
    ditem.save(function(err) {
      if (err) return res.render('garage/new');
      console.log(ditem);
      res.redirect('/garage');
    });
  }




module.exports = {
    index,
    new: newGarage,
    create,
    cartIndex,
    addCart,
    show,
};