var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  request = require("request"),
  pg = require("pg"),
  db = require("./models"),
  passport = require("passport"),
  session = require("cookie-session"),
  async = require("async"),
  app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  // this is in milliseconds
  maxage: 3600000
  })
);

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");

  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.user.find({
      where: {
        id: id
      }
    })
    .then(function(user){
      done(null, user);
    },
    function(err) {
      done(err, null);
    });
});

app.get("/login", function (req, res) {
  if (req.user) {
    res.redirect("/")
  } else {
    res.render("users/login");
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get("/logout", function (req, res) {
  // log out
  req.logout();
  res.redirect("/");
});

app.get("/sign_up", function (req, res) {
  res.render("users/sign_up");
});

app.post("/users", function (req, res) {
  console.log("POST /users");
  var newUser = req.body.user;
  console.log("New User:", newUser);
  // CREATE a user and secure their password
  db.user.createSecure(newUser.email, newUser.password, 
    function () {
      // if a user fails to create make them signup again
      res.redirect("/sign_up");
    },
    function (err, user) {
      // when successfully created log the user in
      // req.login is given by the passport
      req.login(user, function(){
        // after login redirect to home page
        console.log("Logged in ", req.user)
        console.log("Id: ", user.id)
        res.redirect('/game');
      });
    })
});


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

app.get('/user/:userId', function(req, res, next) {
    var data = {};
    /*var countryId = req.params.countryId;*/
    async.parallel([
        //Load user
        function(callback) {
            request('http://api.worldbank.org/countries/br/indicators/SH.STA.MALN.ZS?MRV=1&format=JSON', function(err,body) {
                if (err) return callback(err);
                data.population = JSON.parse(body)[1];
                console.log(data.population);
                callback();
            });
        },
        //Load posts
        function(callback) {
            request('http://api.worldbank.org/countries/br/indicators/SH.STA.MALN.ZS?MRV=1&format=JSON', function(err,resp,body) {
                if (err) return callback(err);
                data.ruralpopulation = JSON.parse(body)[1];
                callback();
            });
        }
    ], 
    function(err, results){
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
    //console.log(results);
    indicatorData = results;
    indicatorData.forEach(function(country){
    country.forEach(function(instance) {
        console.log(instance.date)
        console.log(instance.value)
    });
});
    res.render('game/test', {indicatorData: results});
});



app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});