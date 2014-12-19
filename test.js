//testing API and rendering
app.get('/test', function (req, res) {
  console.log('Got Test');
  countryID = 'br';

  async.parallel([
        function(callback){
          console.log('Got 1');
            request('http://api.worldbank.org/countries/' + countryID + '/indicators/SP.POP.TOTL?MRV=1&format=JSON', function(err, resp, body){
                callback(null, JSON.parse(body)[1]);
            });
        },
        function(callback){
          console.log('Got 2');
            request('http://api.worldbank.org/countries/in/indicators/SP.POP.TOTL?MRV=1&format=JSON', function(err, resp, body){
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
          res.render('game/test', {indicatorData: results});
        });
});