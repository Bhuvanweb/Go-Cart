var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')

/* GET users listing. */


router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
      res.render('admin/view-products',{products,admin:true})
    })
});
router.get('/add-products',(req,res)=>{
  res.render('admin/add-products')
})
router.post('/add-products',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
  productHelpers.addProduct(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
    if(!err){
       res.render('admin/add-products')
    }else{
      console.log(err);
    }
  })
})
})
router.get('/delete-products/:id',(req,res)=>{
  let proId=req.params.id
  productHelpers.deleteProducts(proId).then((response)=>{
    res.redirect('/admin/')
  })
})

router.get('/login',(req,res)=>{
  res.render('admin/login')
})

router.get('/edit-products/:id',async(req,res)=>{
  let product=await productHelpers.getProducts(req.params.id)
  res.render('admin/edit-products',{product})
})

router.post('/edit-products/:id',(req,res)=>{
  let id=req.params.id
  console.log(req.body);
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    let image=req.files.Image
    if(req.files.Image){
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })
})
  
  




module.exports = router;
