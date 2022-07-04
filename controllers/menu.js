const Menu = require('../models/Menu');

exports.registerMenu = async (req, res) => {
  const { name, caption, description, price, category, sub_category, description_on, description_in, stock_availabililty } = req.body;

  try {
    const menu = await Menu.create({
      name,
      caption,
      description,
      price,
      category,
      sub_category,
      description_on,
      description_in,
      stock_availabililty
    });

    res.status(200).json({
      message: 'success',
      menu
    })
  } catch (error) {
    console.log(error);
  }
}

exports.listAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find({})

    res.status(200).json({
      message: 'success',
      menu
    })
  } catch (error) {
    console.log(error)
  }
}