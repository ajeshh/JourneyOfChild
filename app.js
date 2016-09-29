var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  request = require("request"),
  // pg = require("pg"),
  // db = require("./models"),
  passport = require("passport"),
  session = require("cookie-session"),
  async = require("async"),
  app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//cookie
app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  // this is in milliseconds
  maxage: 3600000
  })
);

// //passport use
// app.use(passport.initialize());
// app.use(passport.session());

// //serializing user data
// passport.serializeUser(function(user, done){
//   console.log("SERIALIZED JUST RAN!");

//   done(null, user.id);
// });

// //deserializing user data
// passport.deserializeUser(function(id, done){
//   console.log("DESERIALIZED JUST RAN!");
//   db.user.find({
//       where: {
//         id: id
//       }
//     })
//     .then(function(user){
//       done(null, user);
//     },
//     function(err) {
//       done(err, null);
//     });
// });

// // login 
// app.get("/login", function (req, res) {
//   if (req.user) {
//     res.redirect("/")
//   } else {
//     res.render("users/login");
//   }
// });
// // verify user login
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/sign_up'
// }));

// // log out
// app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });

// //signup
// app.get("/sign_up", function (req, res) {
//   res.render("users/sign_up");
// });

// //post new user data to DB
// app.post("/users", function (req, res) {
//   console.log("POST /users");
//   var newUser = req.body.user;
//   console.log("New User:", newUser);
//   // CREATE a user and secure their password
//   db.user.createSecure(newUser.email, newUser.password, 
//     function () {
//       // if a user fails to create make them signup again
//       res.redirect("/sign_up");
//     },
//     function (err, user) {
//       // when successfully created log the user in
//       // req.login is given by the passport
//       req.login(user, function(){
//         // after login redirect to home page
//         console.log("Logged in ", req.user)
//         console.log("Id: ", user.id)
//         res.redirect('/');
//       });
//     })
// });



//homepage map element
app.get("/map", function (req, res) {
  res.render("game/maprender");
});

app.get("/map2", function (req, res) {
  res.render("sites/maprender");
});






//show country results
app.get("/search", function (req, res) {
  console.log("got it");
  countryID = (req.query.country).toLowerCase();
  console.log("got it too");
  countryFlag = ('http://flags.fmcdn.net/data/flags/normal/' + countryID + '.png');
  console.log(countryFlag);
  async.parallel([
        function(callback){
          console.log('Got 1');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.TOTL?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 2');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 3');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/EN.POP.SLUM.UR.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 4');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.TOTL?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 5');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.TOTL?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 6');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 7');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 8');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 9');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 11');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 12');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 13');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 14');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 10');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 15');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 16');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        }
      ],
        function(err, results){
          console.log('Got callback');
        //indicatorData = results;
        /*indicatorData.forEach(function(country){
          country.forEach(function(instance) {
              console.log(instance.date)
              console.log(instance.value)
          });
      });*/
          console.log(results);
          res.render('game/search', {indicatorData: results});
        });
});



//homepage & API request for population info
app.get("/", function (req, res) {
  console.log('Got homepage');
  countryID = 'WLD';

async.parallel([
      function(callback){
        console.log('Got 1');
        //Total Population
          request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.TOTL?MRV=1&format=JSON', function(err, resp, body){
              callback(null, JSON.parse(body)[1]);
          });
      },
      function(callback){
        console.log('Got 2');
        //Percentage of population under 14
          request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.0014.TO.ZS?MRV=1&format=JSON', function(err, resp, body){
              callback(null, JSON.parse(body)[1]);
          });
      }
    ],
      function(err, results){
        console.log('Got callback');
console.log(results);
      res.render('sites/home',{indicatorData: results});
    });
});


//contact form
app.post("/", function (req, res) {
  db.contact.create({
      name: req.body.contact.name,
      email: req.body.contact.email,
      message: req.body.contact.message
  })
    .then(function (contact) {
        console.log(contact);
        res.redirect("/");
    });
  
});


app.get("/shoutouts", function (req, res) {
  res.render("sites/shoutouts");
});



//server
app.listen(process.env.PORT || 3000, function() {
console.log("Listening");
});