var express = require('express');
var router = express.Router();
const app = express();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51KjfWtDGZlz8iehmD2TIOw9uiIHxSM2jZRSjwKeijSRyld61347FsHSevR7hhMKOBiXQkPpOEUccoTENsZtrTrUy00g1OOmYAK');





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



router.post('/create-checkout-session', async (req, res) => {
  let line_items = [];   
    for (let i = 0; i < req.session.dataCardBike.length; i++) {

      line_items.push({
        price_data: {currency: 'eur',
          product_data: {name: req.session.dataCardBike[i].name},
          unit_amount: req.session.dataCardBike[i].price * 100},
           quantity: req.session.dataCardBike[i].quantity})
    }

  const session = await stripe.checkout.sessions.create(
    
    {
    
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',

  });
 
  res.redirect(303, session.url);
 });

 app.listen(4242, () => console.log(`Listening on port ${4242}!`));

 
 router.get('/success', (req, res) => {
  res.render('success');
 });

 router.get('/cancel', (req, res) => {
  res.render('cancel');
 });


module.exports = router;

