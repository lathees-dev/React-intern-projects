var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
// const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// Connection to Database


mongoose.connect('mongodb+srv://lathees:lathees123@cluster0.8zpgkjv.mongodb.net/Hackathon', { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on('error',()=>console.log("Error in connecting to database.."))
db.once('open',()=> console.log('Connected to Database'))

app.post("/register",(req,res)=>{
var fullname = req.body.fullname
var username = req.body.username
var email = req.body.email
var password = req.body.password

var data={
    "fullname":fullname,
    "username":username,
    "email":email,
    "password":password
}
db.collection('users').insertOne(data,(err,collection)=>{
    if(err){
        throw err;
    }
    console.log("Record Inserted Successfully..")
})
return res.redirect('success.html')
})


app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000");

