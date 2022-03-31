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

let dataCardBike = [];



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {dataBikes: dataBikes});
});


router.get('/shop', function (req, res, next) {
  console.log(req.query)
  dataCardBike.push({
    name: req.query.name,
    url: req.query.src,
    price: req.query.price,
    quantity: req.query.quantity
  })
  res.render('shop', {dataCardBike: dataCardBike})
});


router.post('/update-shop', function (req, res, next) {
  console.log(req.query)
  dataCardBike[req.body.id].quantity = req.body.quantity;
  res.render('shop', {dataCardBike: dataCardBike})
});


router.get('/delete-shop', function (req, res, next) {
  console.log(req.query)
  dataCardBike.splice(req.query.indexNb, 1);
  res.render('shop', {dataCardBike: dataCardBike})
});




module.exports = router;

