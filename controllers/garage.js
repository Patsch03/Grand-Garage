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
    Cart.find({/*something in here eventually to find specific cart*/}).exec(function(err, items){
        // console.log(items);
        console.log(items[0].items[0].name);
        res.render("garage/cart", {items});
    })

}

function addCart(req, res){
    Ditem.findById(req.params.id).exec(function(err, items){
        if(err) return res.redirect('/');
        items.purchased = true;
        items.save();
        Cart.findById("630e57031e52f87a34475e64").exec(function(err, cart){
            cart.items.push(items);
            cart.save();
        })
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

function removeO(req, res){
    Ditem.find({purchased : true}, function(err, ditems){
        if (err) console.log(err);
        ditems.forEach(function(f){
            Ditem.findById(f._id).exec(function(err, items){
                items.purchased = false;
                items.save();
                Cart.findById("630e57031e52f87a34475e64").exec(function(err, cart){
                    cart.items.pop();
                    cart.save();
                })
            })
        })
        res.render('garage/cart', {ditems});
    });

}

function remove(req, res){
    Ditem.findById(req.params.id, function(error, ditems){
        ditems.save(function(error){
          res.render('garage/remove', {ditems});
        });
    });
}

function removeIE(req, res, next){
    Ditem.findByIdAndDelete(req.params.id, function(err, flight){
        res.redirect('/garage');
    });
}

function purchase(req, res){
    Ditem.deleteMany({purchased : true}, function (err, items){
        res.redirect("/garage/cart");
    })
}

module.exports = {
    index,
    new: newGarage,
    create,
    cartIndex,
    addCart,
    show,
    removeO,
    remove,
    delete: removeIE,
    purchase,
};