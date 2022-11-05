var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
var userHelpers=require('../helpers/user-helpers')
const varifyLogin=(req,res,next)=>{
  if(req.session.user.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */

router.get('/', function(req, res, next) {
  let user=req.session.user
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products', { products,user });
  })
});

router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{
    res.render('user/login',{"loginErr":req.session.userLoginErr})
    req.session.userLoginErr=false;
  }
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.user=response.user
      req.session.user.loggedIn=true
      res.redirect('/')
    }else{
      req.session.userLoginErr="Invalid username or Password"
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/')
})
router.get('/cart',varifyLogin,(req,res)=>{
  res.render('user/cart')
})

module.exports = router;
