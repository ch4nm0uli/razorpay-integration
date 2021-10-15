

const express = require('express');

const Razorpay = require('razorpay');
let app = express()

const razorpay = new Razorpay({
  key_id: 'rzp_test_So8lr54HyeN8Nj',
  key_secret: 'YP5hR3cYe5Ip4SWzYRs1ncta',
})

var order_id;
app.set('views','views');

app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));


app.get("/",(req,res) =>{
  res.render('razorpay.ejs');
});

app.post("/order",(req,res) => {
  let options = {
  amount: 500 * 100,  // amount in the smallest currency unit
  currency: "INR",
};

 razorpay.orders.create(options,(err, order) => {
   console.log(order);
   order_id=order.id;
   res.json(order);
 })

});

app.post("/is-order-complete",(req,res) => {

  razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if(paymentDocument.status == "captured"){
      res.send("Payment sucessful");
    }
    else{
      res.redirect("/");
    }
  })


});

app.listen(5000);
