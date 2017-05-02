const mongoose     = require('mongoose');

mongoose.connect('mongodb://localhost/Ironshop');

const Product = require('../models/product-model.js');   //.. INDICATES TO GO ONE ABOVE THE TREE DIRECTORY , IN THIS CASE GOES BACK TO IRONSHOP MAIN DIRECTORY

const products =[
  {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Soylent',
    price: 54.99,
    imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
    description: 'You never have to leave your computer! All you can eat nutrition!',
  },
  {
    name: 'Nintendo Switch',
    price: 299.99,
    imageUrl: 'https://blogs.nvidia.com/wp-content/uploads/2016/10/20-nintendo-switch.jpg',
    description: 'More expensive if you want anything extra'
  },
  {
    name: 'Fender Stratocaster',
    price: 999.99,
    imageUrl: 'http://www.fmicassets.com/Damroot/LgJpg/10001/0131010300_gtr_frt_001_rr.jpg',
    description: "That is the cheap one"
  }
];

//db.products.insertMany()
Product.create(products, (err, productDocs) =>{
  if (err) {
    throw err;
  }
  productDocs.forEach((oneProduct) => {
    console.log(`NEW PRODUCT ${oneProduct.name} -> ${oneProduct._id}`);
  });
});
