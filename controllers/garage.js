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

//   function deleteO(req, res, next){
//     Ditem.findOne({'ditem._id' : req.params.id}).then(function (movie){
//       const review = movie.reviews.id(req.params.id);
//       if(!review.user.equals(req.user._id)) return res.redirect(`/movies/${movie._id}`);
//       review.remove();
//       movie.save().then(function(){
//         res.redirect(`/movies/${movie._id}`);
//       }).catch(function(error){
//         return next(err);
//       })
      
//     });
//   }

function removeO(req, res){
    // let id = "630dc97d4b8cbc8831f34280"
    // Ditem.findById(id).exec(function(err, items){
    //     console.log(items.purchased);
    //     if(err) return res.redirect('/');
    //     items.purchased = false;
    //     items.save();
    //     res.redirect("/garage/cart");
    // });
    Ditem.find({purchased : true}, function(err, ditems){
        if (err) console.log(err);
        ditems.forEach(function(f){
            Ditem.findById(f._id).exec(function(err, items){
                items.purchased = false;
                items.save();
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
    // WORKS IF POST METHOD
    // Ditem.findOne({_id : req.params.id}).then(function (movie){
    //     movie.remove();
    //     movie.save().then(function(){
    //         res.redirect(`/garage`);
    //       }).catch(function(err){
    //         return next(err);
    //       })
    //     res.redirect("/garage");
    //   });

    Ditem.findOne({_id : req.params.id}).then(function (ditems){
        ditems.remove();
        ditems.save().then(function(){
          res.redirect(`/garage`);
        }).catch(function(err){
          return next(err);
        })
        
      });

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
    removeIE,
};