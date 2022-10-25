var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')

/* GET users listing. */
let products=[
  {no:"1",
  name:"Apple",
  category:"fruit",
  description:"It's the best food",
  image:"https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
  price:"400"
}
]

router.get('/', function(req, res, next) {
  res.render('admin/view-products',{products,admin:true})
});
router.get('/add-products',(req,res)=>{
  res.render('admin/add-products')
})
router.post('/add-products',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
})

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


module.exports = router;
