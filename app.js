

const express = require('express');

const bodyParser = require('body-parser')

const date = require(__dirname+"/date.js")
console.log(date)

const app = express();

app.use(bodyParser.urlencoded({extended:"true"}))

app.use(express.static("public"))

var items = [];
var Workitems=[];

app.set('view engine', 'ejs');

app.get("/",function(req,res){
    let day = date();
    res.render("list",{ListTitle:day , Newitems:items})
});

app.post("/",function(req,res){
    console.log(req.body)
    var item = req.body.newitem;
    if(req.body.list==="Work"){
        Workitems.push(item);
        res.redirect("/work")
    }
    else{
        items.push(item)
        res.redirect("/")
    }
});


app.get("/work",function(req,res){
    res.render("list",{ListTitle:"Work" , Newitems:Workitems})
});

app.post("/work",function(req,res){
    var item = req.body.newitem;
    Workitems.push(item);
    res.redirect("/work")
});

app.listen("3000",function(){
    console.log("server started on 3000")
});
