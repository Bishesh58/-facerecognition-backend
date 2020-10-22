const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');


const register = require( './Controllers/register');
const signin = require( './Controllers/signin');
const image = require( './Controllers/image');
const profile = require( './Controllers/profile');



var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'facedetect'
  }
});

const app = express();


//middle ware
app.use(cors());
app.use(express.json());


//end points
// root route 
app.get('/', (req, res) => { res.send('success')});

//signin -->need to use 'POST' instead of 'GET' coz not sending the actual password query string
app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)});

//register
app.post('/register',(req, res) =>{register.handleRegister(req, res, db, bcrypt)});

//profile
app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req, res, db)});

//image
app.put('/image', (req, res)=>{image.handleImage(req, res, db)});

//imageurl
app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)});

app.listen(5000,() =>{
    console.log("server is listening to PORT 5000");
})


