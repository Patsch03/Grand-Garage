const Cart = require('../models/garage');
const Ditem = require('../models/ditems');
const Item = require('../models/garage');
const User = require('../models/user');
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

    if(req.isAuthenticated()){
        console.log(req.user.googleId + "654");
        Cart.findById(req.user.googleId + "654").exec(function(err, cart){
            console.log(cart);
            res.render("garage/cart", {cart});
        })
    }else{
        res.redirect('/garage');
    }

}

function addCart(req, res){
    Ditem.findById(req.params.id).exec(function(err, items){
        if(err) return res.redirect('/');
        console.log(items.purchased);
        items.purchased = true;
        console.log(items.purchased);
        // items.save();

        Cart.findById(req.user.googleId + "654").exec(function(err, cart){
            cart.items.push(items);
            items.remove();
            cart.save();


            res.render("garage/cart", {cart});
        })

    })
}

function newGarage(req, res){
    if(req.isAuthenticated()){
        res.render("garage/new");
    }else{
        res.redirect("/garage");
    }
    
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
    Cart.findById(req.user.googleId + "654", function(err, cart){ 
        if(err) return console.log(err);
        for(let i = 0; i < cart.items.length; i++){
            let ditem = new Ditem({
                name: cart.items[i].name,
                price : cart.items[i].price,
                description : cart.items[i].description,
                purchased : false,    
                user : cart.items[i].user,
                userName : cart.items[i].userName,
                userAvatar : cart.items[i].userAvatar,
            });
            ditem.save();
        }
            Cart.findById(req.user.googleId + "654", function(err, items){
                while(items.items[0]){
                    items.items[0].remove();
               }
               items.save();
            });
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
    Cart.findById(req.user.googleId + "654", function(err, items){
        while(items.items[0]){
            items.items[0].remove();
       }
       items.save();
    });
    res.redirect("/garage");
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