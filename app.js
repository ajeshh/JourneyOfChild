var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
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


app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});