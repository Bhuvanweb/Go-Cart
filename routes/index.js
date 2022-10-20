var express = require('express');
var router = express.Router();

/* GET home page. */
let products=[
  {name:"Apple",
  category:"fruit",
  description:"It's the best food",
  image:"https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
  price:"400"
}
]
router.get('/', function(req, res, next) {
  res.render('index', { products , admin:false});
});

module.exports = router;
