var express = require('express');
var router = express.Router();


let dataBikes = [
  {name: 'BIK045', url: './images/assets/bike-1.jpg', price: 675}, 
  {name: 'ZOOK7', url: './images/assets/bike-2.jpg', price: 799},
  {name: 'LIK089', url: './images/assets/bike-3.jpg', price: 839},
  {name: 'GEW08', url: './images/assets/bike-4.jpg', price: 1249},
  {name: 'KIWIT', url: './images/assets/bike-5.jpg', price: 899},
  {name: 'NASAY', url: './images/assets/bike-6.jpg', price: 1399}
]

let dataCardBike = [
  {name: 'BIK045', url: './images/assets/bike-1.jpg', price: 675, quantity: 1}, 
  {name: 'ZOOK7', url: './images/assets/bike-2.jpg', price: 799, quantity: 2},
  {name: 'LIK089', url: './images/assets/bike-3.jpg', price: 839, quantity: 3}
]

let totalSum = 0;
for (let i=0; i<dataCardBike.length; i++){
  totalSum += dataCardBike[i].price * dataCardBike[i].quantity;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { dataBikes });
});

router.get('/shop', function(req, res, next) {
  res.render('shop', { dataCardBike, totalSum });
});






module.exports = router;
