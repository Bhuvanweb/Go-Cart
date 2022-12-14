var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
var userHelpers=require('../helpers/user-helpers')
var varifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */

router.get('/',async function(req, res, next) {
  let user=req.session.user
  let cartCount=null
  if(req.session.user._id){
  cartCount=await productHelpers.getCartCount(req.session.user._id)
  }
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products', { products,user,cartCount });
  })

});

router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{
    res.render('user/login',{"loginErr":req.session.LoginErr})
    req.session.LoginErr=false;
  }
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
  })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.LoginErr="Invalid username or Password"
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/')
})
router.get('/cart',varifyLogin,async(req,res)=>{
  let products=await userHelpers.getCartProducts(req.session.user._id)
  console.log(products);
  res.render('user/cart',{products,user:req.session.user})
})
router.get('/add-to-cart/:id',varifyLogin,(req,res)=>{
  // console.log(req.body);
  console.log(req.params.id);
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.redirect('/')
  })
})

module.exports = router;
