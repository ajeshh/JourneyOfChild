var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  request = require("request"),
  pg = require("pg"),
  app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/game", function (req, res) {
  res.render("game/index");
});

app.get("/", function (req, res) {
  res.render("sites/home");
});

app.get('/test', function (req, res) {
  request('http://api.worldbank.org/countries/br/indicators/SH.STA.MALN.ZS?MRV=1&format=JSON', function(err,resp,body) {
    var data = JSON.parse(body)[1];
    res.render('game/test', {countryList: data});
    });
});




app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});