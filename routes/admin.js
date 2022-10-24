var express = require('express');
var router = express.Router();

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

module.exports = router;
