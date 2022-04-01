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



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {dataBikes: dataBikes});
});


router.get('/shop', function (req, res, next) {
      //////이해 해야됨
      if (!req.session.dataCardBike) {
        req.session.dataCardBike = [];}

      if (req.session.dataCardBike.find(e => e.name === req.query.name)) {
        for (let i = 0; i < req.session.dataCardBike.length; i++) {
          if (req.session.dataCardBike[i].name === req.query.name) {
            req.session.dataCardBike[i].quantity++

          }}} else {
            req.session.dataCardBike.push({
              name: req.query.name,
              url: req.query.src,
              price: req.query.price,
              quantity: req.query.quantity
            })
          }
        

          res.render('shop', {
            dataCardBike: req.session.dataCardBike
          }) 
        })
        


router.post('/update-shop', function (req, res, next) {  
  req.session.dataCardBike[req.body.id].quantity = req.body.quantity;
  res.render('shop', {dataCardBike: req.session.dataCardBike})
});


router.get('/delete-shop', function (req, res, next) {
  req.session.dataCardBike.splice(req.query.indexNb, 1);
  res.render('shop', {dataCardBike: req.session.dataCardBike})
});




module.exports = router;

