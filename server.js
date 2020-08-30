/*server.js*/

//npm modules
const express = require("express");
const cors = require('cors');
const path = require("path");
var bodyParser = require('body-parser');
var crypto = require('crypto');
var uuid = require('uuid');



//Connect to Mysql
const db = require('./config/connection');
const { Console } = require("console");

//create server
const app = express();
const port = process.env.PORT || "8000";

//default gateway
app.get('/', (req, res) => {
    console.log('inside the homepage callback function')
    // console.log(req.sessionID)
    res.send(`you just hit the homepage `)
})

//Product
app.get('/product', (request, response) => {
    db.query('SELECT * FROM `products`',
        function (err, result, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
                response.json('no test results yet');
            }
            response.json(result);
            console.log(result);
        }
    );
})
app.post('/product', (request, response) => {
    var post_data = request.body; //get post params
    var p_name = post_data.price;
    var p_price = post_data.price;
    var p_description = post_data.desc;


    db.query('INSERT INTO `products` (`p_name`, `p_price`, `p_description`) VALUES (?,?,?)',
        [p_name, p_price, p_description], function (err, result, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
                response.json('no test results yet');
            }
            response.json(result);
            console.log(result);
        }
    );
})

//add cart
app.get('/cart', (request, response) => {
    db.query('SELECT * FROM `cart_items`',
        function (err, result, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
                response.json('no test results yet');
            }
            response.json(result);
            console.log(result);
        }
    );
})

app.post('/cart', (request, response) => {
    var post_data = request.body; //get post params
    var p_id = post_data.id;
    var p_quantity = post_data.quantity;

    console.log(p_id);


    db.query('INSERT INTO `cart_items` (`p_id`, `p_quantity`) VALUES (?,?)',
        [p_id, p_quantity], function (err, result, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
                response.json('no test results yet');
            }
            response.json(result);
            console.log(result);
        }
    );
})


//middleware
app.use(cors());
app.use(bodyParser.json()); //Accespt json params
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
})