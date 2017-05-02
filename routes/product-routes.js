const express        = require('express');

const Product        = require('../models/product-model.js');

const productRoutes  = express.Router();



/* GET products page. */
productRoutes.get('/products', (req, res, next) => {
  Product.find((err, productList) => {
    if (err) {
      next(err);
      return;
    }
    res.render('products/products-list-view.ejs', {
      products: productList
    });
  });
});

productRoutes.get('/products/new', (req, res, next)=> {
  res.render('products/new-product-view.ejs');
});

productRoutes.post('/products/new', (req, res, next)=>{
  const theProduct = new Product({
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: req.body.productImageUrl,
    description: req.body.productDescription
  });

  theProduct.save((err) => {
    if (err) {
      res.render('products/new-product-view.ejs', {
        errors: theProduct.errors
      });
      return;
    }
    res.redirect('/products');
    //redirect instead of render. this way the page doesn't create duplicates
  });
});

productRoutes.get('/products/expensive', (req, res, next) => {
  Product
  .find()
  // REVERSE order sorting (a.k.a. "descending"):
  .sort({ price: -1})
  .limit(10)
  .exec((err, productList) => {
    if (err) {
      next(err);
      return;
    }
    res.render('products/expensive-view.ejs', {
      products: productList
    });
  });
});

productRoutes.get('/products/cheap', (req, res, next) => {
  Product
  .find()
  // REVERSE order sorting (a.k.a. "descending"):
  .sort({ price: +1})
  .limit(10)
  .exec((err, productList) => {
    if (err) {
      next(err);
      return;
    }
    res.render('products/cheap-view.ejs', {
      products: productList
    });
  });
});

    //products-details?id=#########
// productRoutes.get('/product-details', (req, res, next) => {
// const productId= req.query.id;
//But we ca create a better looking web address, and wth embedded info:
productRoutes.get('/products/:id', (req, res, next) => {
  const productId= req.params.id;
// res.send(`Product Details -> ${productId}`);
  Product.findById(productId, (err, theProduct) => {
    if (err) {
      next(err);
      return;
    }
    // 404 if no product was found (i.e. bs id)
    if(!theProduct) {
      next();
      return;
    }
    res.render('products/product-details-view.ejs', {
      product: theProduct
    });
  });
});

productRoutes.get('/products/:id/edit', (req, res, next) => {
  const productId= req.params.id;

  Product.findById(productId, (err, theProduct) => {
    if (err) {
      next(err);
      return;
    }
  res.render('products/edit-product-view.ejs', {
    product: theProduct,
    });
  });
});

//to save info that was added in th Edit page:
productRoutes.post('/products/:id', (req, res, next) => {
  const productId = req.params.id;

  const productChanges ={
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: req.body.productImageUrl,
    description: req.body.productDescription
  };

  Product.findByIdAndUpdate(
    productId,
    productChanges,
    (err, theProduct) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/products');
    }
  );
});

productRoutes.post('/products/:id/delete', (req, res, next) => {
 const productId = req.params.id;

 Product.findByIdAndRemove(productId, (err, product) => {
   if (err){ return next(err); }
   return res.redirect('/products');
 });

});

productRoutes.get('/search', (req, res, next) => {
  const searchTerm = req.query.productSearchTerm;
  if(!searchTerm) {
  // if(!req.query.productSearchTerm) {
  res.render('products/search-view.ejs');
  return;
}
  const searchRegex = new RegExp(searchTerm, 'i');

  Product.find(
    { name: searchRegex },
    (err, searchResults) => {
      if (err) {
        next(err);
        return;
      }
        res.render('products/search-view.ejs', {
          products:searchResults
        });
  });
});

module.exports = productRoutes;
