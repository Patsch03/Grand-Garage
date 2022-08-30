const mongoose = require('mongoose');
//optional shortcut
const Schema = mongoose.Schema

const ditemSchema = new Schema
({
    name: String,
    price: Number,
    description: String,
    purchased: {type: Boolean, default: false}

},{
    timestamps: true
})






module.exports = mongoose.model
("Ditem", ditemSchema);

// module.exports = mongoose.model
// ("Cart", cartSchema);
