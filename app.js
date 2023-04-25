
/* we have to set view engine as ejs. in this res.render function is used to send html pages.
    it assumes that the page to be sent is an .ejs page in a folder named views.
    any valid html is valid ejs. res.render is used to pass variable to .ejs files in key value pairs,
    the first name is the same as used in .ejs file
    and it can be accessed in the ejs file using <%=variable_name%>
    //control statements can be written inside .ejs, have to be enclosed in <%....%>
    express only serves main access point ie app.js and views folder by default, it ignores other static files.
    so to render css and other js files we store them in a folder named public by convention.
    and then write app.use(express.static("public"));
    ejs layouts matlab joh bhi tumko repeated code chaiye woh ek file me daalo usko views wale folder me daalo and
    use <%- include("file_name"); -%> aur samjo woh file ka code waha copy paste ho gya
    we can also create our own module, require it using __dirname+"module_name",
    we can export from module using exports keyword.
    to export multiple things such as 2 or more functions use modules.exports.fun_name = fun,
    due to this, the functions are exported as a whole object and can be accessed using . operator
*/

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