const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: String,
  caption: String,
  description: String,
  price: Number,
  category: String,
  sub_category: String,
  description_on: String,
  description_in: String,
  stock_availability: {
    type: Boolean,
    default: true
  }
})

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;