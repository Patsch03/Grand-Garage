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
        res.render("garage/cart", {items});
    })

}

function addCart(req, res){
    Ditem.findById(req.params.id).exec(function(err, items){
        if(err) return res.redirect('/');
        items.purchased = true;
        items.save();
        Cart.findById("63103effb12e746007a39c91").exec(function(err, cart){
            cart.items.push(items);
            items.remove();
            cart.save();
        })
        res.redirect("/garage/cart");
    })
}

function newGarage(req, res){
    res.render("garage/new");
}


function create(req, res) {
    const ditem = new Ditem(
        {
            name : req.body.name,
            price : req.body.price,
            description : req.body.description,
            user : req.user._id,
            userName : req.user.name,
            userAvatar : req.user.avatar,


        });
    ditem.save(function(err) {
      if (err) return res.render('garage/new');
      res.redirect('/garage');
    });
  }

function removeO(req, res){
    Cart.find({}, function(err, items){
        if(err) return console.log(err);
        // items.purchased = false;
        // items.save();
        items.forEach(function(i){
            // console.log(i);
            for(let j = 0; j < i.items.length; j++){
                // console.log(i.items);
                let ditem = new Ditem(
                    {
                        name: i.items[j].name,
                        price : i.items[j].price,
                        description : i.items[j].description,
                        purchased : false,    
                    });
                    ditem.save();
            }
            Cart.find({}, function(err, items){
                while(items[0].items[0]){
                    items[0].items[0].remove();
                }
                items[0].save();

            });
        })
        // console.log(items);
        res.redirect("/garage/cart");
    })
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