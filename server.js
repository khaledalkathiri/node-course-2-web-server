const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var port = process.env.PORT || 3000; //set the port through Heroku or assign it to the default
var app = express();

app.set("view engine", "hbs");

//middleware very usefull with logs
app.use( (req, res, next) =>{
    var now = new Date().toString();
    var log =  `${now}:   ${req.method}  : ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + '\n', (err) => {
        if(err){
            console.log("Unable to append the file");
        }
    });
    next();
});


hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    res.render('home.hbs', {
        welcomeMessage: "Welcome to my website",
        pageTitle: "Home page"     
    });
});


app.get('/about', (req,res) =>{
    res.render('about.hbs', {
        pageTitle: "About page"
    });
});

app.listen(port, ()=>{
    console.log(`Server is up  on port ${port}`);
});