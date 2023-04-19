const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(express.static ('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://127.0.0.1:27017/foodShop');

const itmeSchema = new mongoose.Schema({
    url:String,
    price:Number,
    count:Number
})
const itemData = mongoose.model('itemData',itmeSchema);


// let firstItem = new itemData({
//     url:"images/image2.png",
//     price:4.5,
//     count:0
// })


// itemData.insertMany([firstItem]).then((items)=>{
//     console.log("inserted successfully");
// });


let url=["images/image2.png"];
let price=[5.4];
let random=[4.5,4.1];
let order = [11];


app.get('/', (req, res) =>{
    itemData.find({}).then((items)=>{
        res.render('index',{items:items,randomNum:random});
    });
    
});

app.post('/',(req,res)=>{   
    let ord = req.body.buyButton;
    itemData.updateMany({_id:ord},{$inc:{count:1}}).then(()=>{
        console.log("Increased successfully");
    })
    // let cart=document.getElementsByClassName('fa-cart-shopping')[0];
    // cart.classList.add('fa-beat');
    console.log(ord);
})

app.get('/cart',(req,res)=>{
    itemData.find({}).then((items)=>{
        res.render('cart',{items:items});
    })
   
})
app.post('/cart',(req,res)=>{
    itemData.updateMany({},{$set:{count:0}}).then(()=>{
        console.log("Count set to 0 , Successfully");
    })
    setTimeout(()=>{
        
        res.redirect('/');
    },1000);
    
})
app.get('/compose',(req,res)=>{
    res.render('compose');
})


app.post('/compose', (req,res)=>{
    let randomNum=Math.random()*1;
    randomNum=4+randomNum;
    random.push(randomNum.toFixed(1));//A random numver added to an array for rating of the item
    let urlCompose=req.body.url;
    let priceCompose=req.body.price;
    let firstItem = new itemData({
        url:urlCompose,
        price:priceCompose,
        count:0
    })
    itemData.insertMany([firstItem]).then((items)=>{
    console.log("inserted successfully");
});
        res.redirect('/');
});


app.listen(3000,()=>{
    console.log("Running on local port 3000");
})
