const mongoose = require('mongoose');
//optional shortcut
const Schema = mongoose.Schema

const itemSchema = new Schema
({
    name: String,
    price: Number,
    description: String,

},{
    timestamps: true
})

const cartSchema = new Schema
({
    items: [itemSchema]

},{
    timestamps: true
})




module.exports = mongoose.model
("Item", itemSchema);
mongoose.model("Cart", cartSchema);

// module.exports = mongoose.model
// ("Cart", cartSchema);
