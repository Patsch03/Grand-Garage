const mongoose = require('mongoose');
//optional shortcut
const Schema = mongoose.Schema

const ditemSchema = new Schema
({
    name: String,
    price: Number,
    description: String,
    purchased: {type: Boolean, default: false},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
    show: Boolean,


},{
    timestamps: true
})


module.exports = mongoose.model
("Ditem", ditemSchema);
