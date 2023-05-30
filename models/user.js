const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new Schema
({
  name: String,
    price: Number,
    description: String,
    purchased: {type: Boolean, default: false},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
    image: String,
    

},{
    timestamps: true
})

const cartSchema = new Schema
({
    items: [itemSchema],

},{
    timestamps: true
})

const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);